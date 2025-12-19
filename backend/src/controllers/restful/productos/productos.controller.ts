import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  tryCatch,
  chequearNull,
} from "../../../middlewares/error.middleware.js";
import {
  SProducto,
  SProductoActualizar,
} from "../../../schemas/productos/productos.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient().productos;

export const verProductos = tryCatch(async (req: Request, res: Response) => {
  const productos = await prisma.findMany();

  return res.status(200).json({
    mensaje: "Productos obtenidos!",
    objeto: productos,
  });
});

export const buscarProducto = tryCatch(async (req: Request, res: Response) => {
  // obteniendo parametros
  const { ID: ProductoID } = SIDParams.parse(req.params);

  // haciendo joins
  const productoBuscado = await prisma.findUnique({
    where: {
      ProductoID,
    },
    include: {
      paquetes: {
        include: {
          paquetes: true,
          proveedorespaquetes: true,
        },
      },
    },
  });
  chequearNull(productoBuscado, 404, "Ese producto no existe");

  return res
    .status(200)
    .json({ mensaje: "Empleado obtenido", objeto: productoBuscado });
});

export const crearProducto = tryCatch(async (req: Request, res: Response) => {
  // obteniendo datos
  const nuevoProducto = SProducto.parse(req.body);

  // guardando en db
  await prisma.create({
    data: nuevoProducto,
  });

  // hecho
  return res.status(201).json({ mensaje: "Producto creado!" });
});

export const actualizarProducto = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo id
    const { ID: ProductoID } = SIDParams.parse(req.params);

    // validando datos
    const nuevosDatos = SProductoActualizar.parse(req.body);

    // actualizando
    await prisma.update({
      where: {
        ProductoID,
      },
      data: {
        ...nuevosDatos,
      },
    });

    return res.status(200).json({
      mensaje: "Producto modificado!",
    });
  }
);
