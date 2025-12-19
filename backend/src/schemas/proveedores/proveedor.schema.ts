import { z } from "zod";
import { StringTrim } from "../utils/utils.schema.js";

export const SProveedor = z.strictObject({
  Nombre: StringTrim.max(300),
  Celular: StringTrim.min(9).max(45),
  Notas: StringTrim.max(45).nullish(),
});
