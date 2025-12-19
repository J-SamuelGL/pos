import { z } from "zod";

export const SProducto = z.strictObject({
  SubcategoriaID: z.nullish(z.coerce.number().int().positive().min(1)),
  CategoriaID: z.nullish(z.coerce.number().int().positive().min(1)),
  MarcaID: z.nullish(z.coerce.number().int().positive().min(1)),
  Nombre: z.string().trim().min(2).max(300),
  Descripcion: z.nullish(z.string().trim().min(1).max(200)),
  PrecioVenta: z.coerce.number().positive().min(0.01),
  Cantidad: z.coerce.number().int().positive().min(1).default(0),
  FechaHoraModificacion: z.date().default(new Date()),
  Imagen: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|svg|webp|ico)$/i)
    .max(300)
    .default("usuario-default.png"),
});

export const SProductoActualizar = z.strictObject({
  SubcategoriaID: z.nullish(z.coerce.number().int().positive().min(1)),
  CategoriaID: z.nullish(z.coerce.number().int().positive().min(1)),
  MarcaID: z.nullish(z.coerce.number().int().positive().min(1)),
  Nombre: z.string().trim().min(2).max(300),
  Descripcion: z.nullish(z.string().trim().min(1).max(200)),
  PrecioVenta: z.coerce.number().positive().min(0.01),
  FechaHoraModificacion: z.date().default(new Date()),
  Imagen: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|svg|webp|ico)$/i)
    .max(300)
    .default("usuario-default.png"),
});
