import { tryCatch } from "../../../middlewares/error.middleware.js";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { SCompra } from "../../../schemas/inventario/compras.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient();

export const crearCompra = tryCatch(async (req: Request, res: Response) => {
  // validar datos
  const compraRecibida = SCompra.parse(req.body);

  // ES UNA TRANSACCION
  const compra = await prisma.$transaction(async (tx) => {
    // primero crear venta para obtener el id
    const compraGenerada = await tx.compras.create({
      data: {
        EmpleadoID: compraRecibida.EmpleadoID,
        FechaHora: compraRecibida.FechaHora,
        Total: compraRecibida.Total,
        Notas: compraRecibida.Notas || null,
      },
    });

    // insertar los detalles
    for (const detalle of compraRecibida.DetallesCompra) {
      await tx.detallescompra.create({
        data: {
          ...detalle,
          CompraID: compraGenerada.CompraID,
        },
      });
    }

    // retornar la venta creada con sus detalles
    return await tx.compras.findUnique({
      where: { CompraID: compraGenerada.CompraID },
      include: { detallescompra: true },
    });
  });
  return res.status(201).json({ mensaje: "Creado", objeto: compra });
});

export const verCompras = tryCatch(async (req: Request, res: Response) => {
  const compras = await prisma.compras.findMany({
    include: {
      detallescompra: true,
      empleados: true,
    },
  });
  return res
    .status(200)
    .json({ mensaje: "Compras obtenidas", objeto: compras });
});

export const buscarDetalle = tryCatch(async (req: Request, res: Response) => {
  const { ID: CompraID } = SIDParams.parse(req.params);

  const detalles = await prisma.detallescompra.findMany({
    where: {
      CompraID,
    },
    include: {
      proveedorespaquetes: {
        include: {
          paquetes: true,
        },
      },
    },
  });
  return res.status(200).json({ mensaje: "Compra obtenida", objeto: detalles });
});
