import { z } from "zod";
import { StringTrim } from "../../../../utils/utils.schema";

export const SProveedor = z.strictObject({
  Nombre: StringTrim.max(300).min(1, "No ha ingresado el nombre"),
  Celular: StringTrim.min(9, "No es un numero valido, eg: 2343-2345").max(45),
  Notas: StringTrim.max(45).nullish(),
});

export type TFormularioProveedor = z.infer<typeof SProveedor>;
