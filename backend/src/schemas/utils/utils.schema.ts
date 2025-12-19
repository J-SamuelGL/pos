import { z } from "zod";

export const LlaveForanea = z.coerce.number().int().positive().min(1);
export const Dinero = z.coerce.number().min(0.01);
export const Entero = z.coerce.number().int().positive().min(1);
export const FechaHora = z.coerce.date().default(new Date());
export const StringTrim = z.string().trim();
