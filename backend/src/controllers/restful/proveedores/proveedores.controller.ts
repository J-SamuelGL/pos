import { Request, Response } from "express";
import { tryCatch } from "../../../middlewares/error.middleware.js";
import { SProveedor } from "../../../schemas/proveedores/proveedor.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().proveedores;

export const verProveedores = tryCatch(async (req: Request, res: Response) => {
  // accediendo a la db
  const proveedores = await prisma.findMany();

  // hecho
  return res.status(200).json({
    mensaje: "Proveedores obtenidos!",
    objeto: proveedores,
  });
});

export const crearProveedores = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo datos
    const nuevoProveedor = SProveedor.parse(req.body);

    // guardando en db
    await prisma.create({
      data: nuevoProveedor,
    });

    // hecho
    return res.status(201).json({ mensaje: "Proveedor creado!" });
  }
);

export const buscarProveedor = tryCatch(async (req: Request, res: Response) => {
  // obteniendo id
  const { ID: ProveedorID } = SIDParams.parse(req.params);

  // buscando marca
  const proveedor = await prisma.findUnique({
    where: {
      ProveedorID,
    },
  });

  // hecho
  return res
    .status(200)
    .json({ mensaje: "Proveedor obtenido!", objeto: proveedor });
});

export const actualizarProveedor = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo id
    const { ID: ProveedorID } = SIDParams.parse(req.params);

    // obteniendo datos
    const nuevosDatos = SProveedor.parse(req.body);

    // actualizando db
    await prisma.update({
      where: {
        ProveedorID,
      },
      data: {
        ...nuevosDatos,
      },
    });

    return res.status(200).json({ mensaje: "Proveedor actualizado!" });
  }
);
