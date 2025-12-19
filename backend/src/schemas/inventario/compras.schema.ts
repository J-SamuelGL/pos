import { z } from "zod";
import {
  Dinero,
  Entero,
  FechaHora,
  LlaveForanea,
} from "../utils/utils.schema.js";

export const SDetalleCompra = z.strictObject({
  PaqueteID: LlaveForanea,
  PrecioCompra: Dinero,
  Cantidad: Entero,
  Subtotal: Dinero,
});

export const SCompra = z.strictObject({
  ProveedorID: LlaveForanea.optional(),
  EmpleadoID: LlaveForanea,
  FechaHora: FechaHora.optional().default(new Date()),
  Total: Dinero,
  NIT: z.string().optional().default("123456789"),
  Direccion: z.string().optional(),
  Notas: z.string().optional(),
  DetallesCompra: SDetalleCompra.array().nonempty(),
});
