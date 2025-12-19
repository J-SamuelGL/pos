import { z } from "zod";

export const LlaveForanea = z.int().min(1);
export const Dinero = z.number().min(0.01, "La cantidad minima es Q0.01");
export const Entero = z
  .int("Tiene que ser un entero")
  .positive("No puede ser negativo")
  .min(1, "No puede ser menor que 1");
export const InputSugerencia = z.any().refine((val) => val !== null, {
  message: "No ha seleccionado nada",
});
export const StringTrim = z.string().trim();

export const FechaHora = z.date();
