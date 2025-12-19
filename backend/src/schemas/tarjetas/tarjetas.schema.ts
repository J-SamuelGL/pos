import { z } from "zod";
import {
  Dinero,
  StringTrim,
  FechaHora,
  LlaveForanea,
} from "../utils/utils.schema.js";

export const STarjeta = z.strictObject({
  TarjetaID: LlaveForanea,
  MontoInicial: Dinero,
  Moneda: StringTrim,
  FechaEmision: FechaHora.nullish(),
  FechaExpiracion: FechaHora.nullish(),
  Estado: StringTrim, //z.enum(["activa, agotada, expirado, anulada"]),
  EmpleadoID: LlaveForanea,
  OtorgadoPor: LlaveForanea,
});

export const STarjetaEditar = z.strictObject({
  MontoInicial: Dinero,
  Moneda: StringTrim,
  FechaExpiracion: FechaHora.nullish(),
  Estado: StringTrim, //z.enum(["activa, agotada, expirado, anulada"]),
});
