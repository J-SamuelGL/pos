import { z } from "zod";
import {
  InputSugerencia,
  StringTrim,
  Dinero,
  FechaHora,
} from "../../../utils/utils.schema";

const mensajeLongitudCampo = (
  longitud: "grande" | "pequeño",
  campo: string,
  minimo: number,
  maximo: number,
) => {
  return `El ${campo} es muy ${longitud}. Tiene que tener al menos ${minimo} caracteres y como maximo ${maximo}`;
};

export const SFormularioCrearEmpleado = z.strictObject({
  RolID: InputSugerencia,
  Nombres: StringTrim.min(
    3,
    mensajeLongitudCampo("pequeño", "nombre", 3, 150),
  ).max(150, mensajeLongitudCampo("grande", "nombre", 3, 150)),
  Apellidos: StringTrim.min(
    3,
    mensajeLongitudCampo("pequeño", "apellidos", 3, 150),
  ).max(150, mensajeLongitudCampo("grande", "apellidos", 3, 150)),
  Salario: Dinero,
  Celular: StringTrim.min(9, "No es un numero valido")
    .max(45, "No es un numero valido")
    .nullish(),
  Genero: InputSugerencia,
  FechaNacimiento: FechaHora.nullish(),
  FechaContratado: FechaHora,
  Usuario: StringTrim.min(
    3,
    mensajeLongitudCampo("pequeño", "usuario", 3, 45),
  ).max(45, mensajeLongitudCampo("grande", "usuario", 3, 45)),
  Clave: z
    .string()
    .min(8, "La clave debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La clave debe tener por lo menos una letra mayuscula")
    .regex(/[0-9]/, "La clave debe tener al menos un numero")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "La clave debe incluir al menos un caracter especial (!@#$%^&*...)",
    ),
});
export type TFormularioCrearEmpleado = z.infer<typeof SFormularioCrearEmpleado>;

// editar empleado
export const SFormularioActualizarEmpleado = SFormularioCrearEmpleado.omit({
  Clave: true,
  FechaContratado: true,
  FechaNacimiento: true,
  Genero: true,
}).extend({
  FechaNacimiento: z
    .string()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
  FechaFinLabores: z
    .string()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
});

export type TFormularioEditarEmpleado = z.infer<
  typeof SFormularioActualizarEmpleado
>;
