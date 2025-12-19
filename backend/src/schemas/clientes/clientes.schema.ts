import { z } from "zod";
import { StringTrim } from "../utils/utils.schema.js";

export const SCliente = z.strictObject({
  NIT: StringTrim,
  Nombres: StringTrim,
  Apellidos: StringTrim,
});
