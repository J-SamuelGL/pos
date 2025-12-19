import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../../middlewares/error.middleware.js";

const prisma = new PrismaClient();

const mostrarIdentificacion = tryCatch(async (req: Request, res: Response) => {
  const empleado = await prisma.empleados.findUnique({
    select: {
      EmpleadoID: true,
      Nombres: true,
      Apellidos: true,
      Usuario: true,
      roles: {
        select: {
          Nombre: true,
        },
      },
    },
    where: {
      EmpleadoID: Number(req.JWTpayload?.empleadoId),
    },
  });

  return res.status(200).json({
    mensaje: "Identificacion obtenida!",
    objeto: empleado,
  });
});

export default mostrarIdentificacion;
