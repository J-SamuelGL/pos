import { z } from "zod";
import {
  LlaveForanea,
  Dinero,
  Entero,
  FechaHora,
  StringTrim,
} from "../utils/utils.schema.js";

export const SDetalleVenta = z
  .strictObject({
    PaqueteID: LlaveForanea.nullish(),
    ProductoID: LlaveForanea.nullish(),
    PrecioVenta: Dinero,
    Subtotal: Dinero,
    Cantidad: Entero,
    Utilidad: z.number(),
  })
  .refine(
    (data) => {
      const esPaquete = data.PaqueteID != null;
      const esUnidad = data.ProductoID != null;

      return (esPaquete && !esUnidad) || (!esPaquete && esUnidad);
    },
    {
      message: "El producto debe ser unidad o paquete, no ambos",
    }
  );

export const SVenta = z.strictObject({
  EmpleadoID: LlaveForanea,
  FechaHora: FechaHora,
  NIT: StringTrim.nullish(),
  Total: Dinero,
  MontoRecibido: Dinero,
  Vuelto: z.coerce.number().min(0),
  Notas: StringTrim.nullish(),
  DetallesVenta: z.array(SDetalleVenta).nonempty(),
});
