import { z } from "zod";
import {
  LlaveForanea,
  Entero,
  Dinero,
  FechaHora,
  StringTrim,
} from "../../../../utils/utils.schema";

export const SDetalleCompra = z.strictObject({
  // no CompraID porque no se puede obtener
  // ! PaqueteID es ProveedorPaqueteID
  PaqueteID: LlaveForanea,
  PrecioCompra: Dinero,
  Cantidad: Entero,
  Subtotal: Dinero,
});
export type TDetalleCompra = z.infer<typeof SDetalleCompra>;

export const SCompra = z.strictObject({
  EmpleadoID: LlaveForanea,
  FechaHora: FechaHora,
  Total: Dinero,
  Notas: StringTrim.nullish(),
  DetallesCompra: SDetalleCompra.array().nonempty(),
});
export type TCompra = z.infer<typeof SCompra>;
