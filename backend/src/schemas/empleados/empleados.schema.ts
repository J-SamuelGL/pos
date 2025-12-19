import { z } from "zod";
import { Dinero, StringTrim, FechaHora } from "../utils/utils.schema.js";

export const SCrearEmpleado = z.strictObject({
  RolID: z.coerce.number().int().positive().min(1).max(4),
  Nombres: z.string().trim().min(3).max(150),
  Apellidos: z.string().trim().min(3).max(150),
  Salario: Dinero,
  Celular: StringTrim.min(9).max(45).nullish(),
  Genero: StringTrim,
  FechaNacimiento: FechaHora.nullish(),
  FechaContratado: FechaHora,
  Imagen: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|svg|webp|ico)$/i)
    .max(300)
    .default("usuario-default.png"),
  Usuario: z.string().trim().min(3).max(45),
  Clave: z.string().trim().min(7).max(300),
});

export const SEmpleadoParams = z.strictObject({
  EmpleadoID: z.coerce.number().int().positive().min(1),
});

export const SActualizarEmpleado = SCrearEmpleado.omit({
  Clave: true,
  FechaContratado: true,
  Genero: true,
}).extend({
  FechaFinLabores: FechaHora.nullish(),
});
