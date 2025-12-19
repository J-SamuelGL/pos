import { z } from "zod";

export const SLogeo = z.strictObject({
  Usuario: z.string().trim().min(1).max(45),
  Clave: z.string().trim().min(7).max(300),
});

export const SActualizarClave = SLogeo.omit({ Usuario: true });
