import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../../../middlewares/error.middleware.js";
import {
  STarjeta,
  STarjetaEditar,
} from "../../../schemas/tarjetas/tarjetas.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient().tarjetasregalo;

export const verTarjetas = tryCatch(async (req: Request, res: Response) => {
  const tarjetas = await prisma.findMany();

  return res.status(200).json({
    mensaje: "Tarjetas obtenidas!",
    objeto: tarjetas,
  });
});

export const crearTarjeta = tryCatch(async (req: Request, res: Response) => {
  // obteniendo datos
  const nuevaTarjeta = STarjeta.parse(req.body);

  // guardando en db
  await prisma.create({
    data: nuevaTarjeta,
  });

  // hecho
  return res.status(201).json({ mensaje: "Tarjeta creado!" });
});

export const actualizarTarjeta = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo id
    const { ID: TarjetaID } = SIDParams.parse(req.params);

    // validando datos
    const nuevosDatos = STarjetaEditar.parse(req.body);

    // actualizando
    await prisma.update({
      where: {
        TarjetaID,
      },
      data: {
        ...nuevosDatos,
      },
    });

    return res.status(200).json({
      mensaje: "Tarjeta modificada!",
    });
  }
);

export const eliminarTarjeta = tryCatch(async (req: Request, res: Response) => {
  // obteniendo id
  const { ID: TarjetaID } = SIDParams.parse(req.params);

  // actualizando
  await prisma.delete({
    where: {
      TarjetaID,
    },
  });

  return res.status(200).json({
    mensaje: "Tarjeta eliminada!",
  });
});
