import { chequearNull } from "../../../middlewares/error.middleware.js";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../../../middlewares/error.middleware.js";
import bcrypt from "bcryptjs";
import {
  SCrearEmpleado,
  SActualizarEmpleado,
} from "../../../schemas/empleados/empleados.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient().empleados;

export const verEmpleados = tryCatch(async (req: Request, res: Response) => {
  // buscando empleados
  const empleados = await prisma.findMany({
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
  });

  return res.status(200).json({
    mensaje: "Empleados obtenidos!",
    objeto: empleados,
  });
});

export const crearEmpleado = tryCatch(async (req: Request, res: Response) => {
  // validando parametros
  const nuevoEmpleado = SCrearEmpleado.parse(req.body);
  const { Clave } = nuevoEmpleado;

  // encriptar
  const claveEncriptada = await bcrypt.hash(Clave, 10);

  // crear empleado
  await prisma.create({
    data: {
      ...nuevoEmpleado,
      Clave: claveEncriptada,
      FechaCreacion: new Date(),
    },
  });

  return res.status(201).json({ mensaje: "Usuario creado!" });
});

export const buscarEmpleado = tryCatch(async (req: Request, res: Response) => {
  // obteniendo id
  const { ID: EmpleadoID } = SIDParams.parse(req.params);

  // buscando empleado
  const empleado = await prisma.findUnique({
    omit: {
      Clave: true,
      VersionToken: true,
    },
    include: {
      roles: {
        select: {
          Nombre: true,
          Descripcion: true,
        },
      },
    },
    where: {
      EmpleadoID,
    },
  });
  chequearNull(empleado, 404, "Este empleado no existe!");

  return res.status(200).json({
    mensaje: "Empleado obtenido!",
    objeto: empleado,
  });
});

export const actualizarEmpleado = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo id
    const { ID: EmpleadoID } = SIDParams.parse(req.params);

    // validando datos
    const nuevosDatos = SActualizarEmpleado.parse(req.body);

    // actualizando
    await prisma.update({
      where: {
        EmpleadoID,
      },
      data: {
        ...nuevosDatos,
      },
    });

    return res.status(200).json({
      mensaje: "Empleado modificado!",
    });
  }
);
