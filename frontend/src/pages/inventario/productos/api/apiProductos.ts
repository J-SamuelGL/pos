import API from "../../../../lib/axios";
import { getError } from "../../../../utils/errores";
import { RUTAS } from "../../../../utils/globales";
import type { APIRespuestaObjeto } from "../../../../utils/globales";
import type {
  TRespuestaProducto,
  TRespuestaProductoBuscar,
  TFormularioProducto,
} from "./productos.schema";

export const verProductos = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TRespuestaProducto[] | []>
    >(RUTAS.PRODC);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const crearProductos = async (producto: TFormularioProducto) => {
  try {
    const respuesta = await API.post(RUTAS.PRODC, producto);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const buscarProducto = async (id: number | null) => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TRespuestaProductoBuscar>
    >(`${RUTAS.PRODC_BSR}${id}`);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const actualizarProducto = async (
  productoPayload: TFormularioProducto & { ID: string | undefined },
) => {
  try {
    const { ID, ...producto } = productoPayload;
    const respuesta = await API.put(`${RUTAS.PRODC_BSR}${ID}`, producto);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
