import API from "../../../../lib/axios";
import { getError } from "../../../../utils/errores";
import { RUTAS } from "../../../../utils/globales";
import type {
  APIRespuestaObjeto,
  APIRespuestaSimple,
} from "../../../../utils/globales";
import { type id } from "../../../../utils/globales";
import { type TFormularioProveedor } from "./proveedores.schema";

type TRespuestaProveedor = {
  ProveedorID: number;
  Nombre: string;
  Celular: string;
  Notas: string | null;
};

export const verProveedores = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TRespuestaProveedor[] | []>
    >(RUTAS.PROV);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const crearProveedores = async (proveedor: TFormularioProveedor) => {
  try {
    const respuesta = await API.post<APIRespuestaSimple>(RUTAS.PROV, proveedor);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const buscarProveedor = async (ID: id) => {
  try {
    const respuesta = await API.get<APIRespuestaObjeto<TRespuestaProveedor>>(
      `${RUTAS.PROV_BSR}${ID}`,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const actualizarProveedor = async (
  datos: TFormularioProveedor & { ID: id },
) => {
  try {
    const { ID, ...producto } = datos;
    const respuesta = await API.put<APIRespuestaSimple>(
      `${RUTAS.PROV_BSR}${ID}`,
      producto,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
