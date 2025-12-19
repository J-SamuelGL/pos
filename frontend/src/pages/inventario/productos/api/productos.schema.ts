import { z } from "zod";
import { StringTrim, Dinero } from "../../../../utils/utils.schema";
import type {
  TPaquete,
  TRespuestaPaquete,
} from "../../paquetes/api/apiPaquetes";

export const SFormularioProducto = z.strictObject({
  Nombre: StringTrim.min(2, "Ese nombre es muy pequeño, minimo 2 letras").max(
    300,
    "Ese nombre es muy grande, maximo 300 letras",
  ),
  Descripcion: StringTrim.max(200, "La descripcion es muy grande").nullable(),
  PrecioVenta: Dinero,
});
export type TFormularioProducto = z.infer<typeof SFormularioProducto>;

// respuesta backend
export type TRespuestaProducto = {
  ProductoID: number;
  Nombre: string;
  Descripcion: string | null;
  PrecioVenta: string;
  Cantidad: number;
  Imagen: string;
  FechaHoraModificacion: string;
};

// la respuesta desde productos es distinta
export type TPaqueteProducto = Omit<TPaquete, "productos"> & {
  paquetes: Omit<TPaquete, "productos"> | null;
  proveedorespaquetes: Omit<TRespuestaPaquete, "proveedores" | "paquetes">[];
};

export type TRespuestaProductoBuscar = TRespuestaProducto & {
  paquetes: TPaqueteProducto[] | [];
};
