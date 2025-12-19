import { Request, Response } from "express";
import {
  SCrearPaquete,
  SEditarPaquete,
} from "../../../schemas/inventario/paquetes.schema.js";
import {
  chequearNull,
  tryCatch,
} from "../../../middlewares/error.middleware.js";
import { PrismaClient } from "@prisma/client";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient();

export const crearPaquetes = tryCatch(async (req: Request, res: Response) => {
  const nuevoPaquete = SCrearPaquete.parse(req.body);

  // es una transaccion
  await prisma.$transaction(async (tx) => {
    // primero se crea el paquete
    const paquete = await tx.paquetes.create({
      data: {
        ProductoID: nuevoPaquete.ProductoID,
        Nombre: nuevoPaquete.Nombre,
        Descripcion: nuevoPaquete.Descripcion,
        UnidadesTotales: nuevoPaquete.UnidadesTotales,
        PrecioVenta: nuevoPaquete.PrecioVenta,
        MedidaBase: nuevoPaquete.MedidaBase,
      },
    });

    // despues se registra en paquete proveedor
    await tx.proveedorespaquetes.create({
      data: {
        ProveedorID: nuevoPaquete.ProveedorID,
        PaqueteID: paquete.PaqueteID,
        PrecioCompra: nuevoPaquete.PrecioCompra,
        Notas: nuevoPaquete.Notas,
      },
    });
  });

  return res.status(201).json({ mensaje: "Paquete creado!" });
});

export const verPaquetes = tryCatch(async (req: Request, res: Response) => {
  // buscando
  const paquetes = await prisma.proveedorespaquetes.findMany({
    include: {
      proveedores: true,
      paquetes: {
        include: {
          paquetes: true,
          productos: true,
        },
      },
    },
  });
  return res
    .status(200)
    .json({ mensaje: "Paquetes obtenidos", objeto: paquetes });
});

export const actualizarPaquete = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo id
    const { ID: PaqueteID } = SIDParams.parse(req.params);

    // validando datos
    const nuevosDatos = SEditarPaquete.parse(req.body);

    // actualizando
    await prisma.paquetes.update({
      where: {
        PaqueteID,
      },
      data: {
        ...nuevosDatos,
      },
    });

    return res.status(200).json({
      mensaje: "Paquete modificado!",
    });
  }
);

export const buscarPaquete = tryCatch(async (req: Request, res: Response) => {
  // obteniendo id
  const { ID: ProveedorPaqueteID } = SIDParams.parse(req.params);

  // buscando
  const paquete = await prisma.proveedorespaquetes.findUnique({
    include: {
      proveedores: true,
      paquetes: {
        include: {
          paquetes: true,
          productos: true,
        },
      },
    },
    where: {
      ProveedorPaqueteID,
    },
  });
  chequearNull(paquete, 404, "Este paquete no existe!");

  return res.status(200).json({
    mensaje: "Paquete obtenido!",
    objeto: paquete,
  });
});
