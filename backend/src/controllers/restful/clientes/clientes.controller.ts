import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../../../middlewares/error.middleware.js";
import { SCliente } from "../../../schemas/clientes/clientes.schema.js";

const prisma = new PrismaClient().clientes;

export const verClientes = tryCatch(async (req: Request, res: Response) => {
  const clientes = await prisma.findMany();

  return res.status(200).json({
    mensaje: "Clientes obtenidos!",
    objeto: clientes,
  });
});

export const crearCliente = tryCatch(async (req: Request, res: Response) => {
  // obteniendo datos
  const nuevoCliente = SCliente.parse(req.body);

  // guardando en db
  await prisma.create({
    data: nuevoCliente,
  });

  // hecho
  return res.status(201).json({ mensaje: "Cliente creado!" });
});
