import { z } from "zod";
import {
  InputSugerencia,
  Entero,
  Dinero,
  StringTrim,
} from "../../../../utils/utils.schema";

export const SCrearPaquete = z.strictObject({
  ProductoID: InputSugerencia,
  Nombre: StringTrim.min(1, "El nombre no puede estar vacio").max(
    150,
    "El nombre es muy grande",
  ),
  Descripcion: StringTrim.max(300, "La descripcion es muy grande!").nullish(),
  UnidadesTotales: Entero,
  PrecioVenta: Dinero,
  MedidaBase: InputSugerencia.nullish(),
  ProveedorID: InputSugerencia,
  PrecioCompra: Dinero,
  Notas: StringTrim.max(150).nullish(),
});

export type TPaqueteFormularioCrear = z.infer<typeof SCrearPaquete>;

export const SEditarPaquete = SCrearPaquete.omit({ ProductoID: true });
export type TPaqueteFormularioEditar = z.infer<typeof SEditarPaquete>;
