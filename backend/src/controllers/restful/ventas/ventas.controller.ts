import { tryCatch } from "../../../middlewares/error.middleware.js";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { SVenta } from "../../../schemas/ventas/ventas.schema.js";
import { SIDParams } from "../../../schemas/utils/params.schema.js";

const prisma = new PrismaClient();

export const crearVenta = tryCatch(async (req: Request, res: Response) => {
  // validar datos
  const ventaRecibida = SVenta.parse(req.body);

  // ES UNA TRANSACCION
  const venta = await prisma.$transaction(async (tx) => {
    // primero crear venta para obtener el id
    const ventaGenerado = await tx.ventas.create({
      data: {
        EmpleadoID: ventaRecibida.EmpleadoID,
        FechaHora: ventaRecibida.FechaHora,
        NIT: ventaRecibida.NIT,
        Total: ventaRecibida.Total,
        Notas: ventaRecibida.Notas || null,
        MontoRecibido: ventaRecibida.MontoRecibido,
        Vuelto: ventaRecibida.Vuelto,
      },
    });

    // insertar los detalles
    await tx.detallesventa.createMany({
      data: ventaRecibida.DetallesVenta.map((detalle) => ({
        ...detalle,
        VentaID: ventaGenerado.VentaID,
      })),
    });

    // retornar la venta creada con sus detalles
    return await tx.ventas.findUnique({
      where: { VentaID: ventaGenerado.VentaID },
      include: { detallesventa: true },
    });
  });
  return res.status(201).json({ mensaje: "Creado", objeto: venta });
});

export const verVentas = tryCatch(async (req: Request, res: Response) => {
  const ventas = await prisma.ventas.findMany({
    include: {
      detallesventa: true,
      empleados: true,
    },
  });
  return res.status(200).json({ mensaje: "Ventas obtenidas", objeto: ventas });
});

export const buscarDetalle = tryCatch(async (req: Request, res: Response) => {
  const { ID: VentaID } = SIDParams.parse(req.params);

  const detalles = await prisma.detallesventa.findMany({
    where: {
      VentaID,
    },
    include: {
      proveedorespaquetes: {
        include: {
          paquetes: true,
        },
      },
      productos: true,
    },
  });
  return res.status(200).json({ mensaje: "Venta obtenida", objeto: detalles });
});
