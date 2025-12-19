import { z } from "zod";
import { StringTrim } from "../../../../utils/utils.schema";

export const SCliente = z.strictObject({
  NIT: StringTrim.min(1, "No ha ingresado el NIT"),
  Nombres: StringTrim.min(1, "No ha ingresado el nombre"),
  Apellidos: StringTrim.min(1, "No ha ingresado el apellido"),
});

export type TCliente = z.infer<typeof SCliente>;
