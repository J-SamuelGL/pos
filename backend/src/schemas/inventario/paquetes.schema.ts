import { z } from "zod";
import {
  LlaveForanea,
  Dinero,
  Entero,
  StringTrim,
} from "../utils/utils.schema.js";

export const SCrearPaquete = z.strictObject({
  ProductoID: LlaveForanea,
  Nombre: StringTrim.min(1, "El nombre no puede estar vacio").max(
    150,
    "El nombre es muy grande"
  ),
  UnidadesTotales: Entero,
  PrecioVenta: Dinero,
  Descripcion: StringTrim.max(300, "La descripcion es muy grande!").nullish(),
  MedidaBase: LlaveForanea.nullish(),
  ProveedorID: LlaveForanea,
  PrecioCompra: Dinero,
  Notas: StringTrim.max(150).nullish(),
});

export const SEditarPaquete = SCrearPaquete.omit({ ProductoID: true });
