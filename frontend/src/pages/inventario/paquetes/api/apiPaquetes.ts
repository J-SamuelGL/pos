import API from "../../../../lib/axios";
import { getError } from "../../../../utils/errores";
import { RUTAS } from "../../../../utils/globales";
import type { APIRespuestaObjeto, id } from "../../../../utils/globales";
import type {
  TPaqueteFormularioCrear,
  TPaqueteFormularioEditar,
} from "./paquetes.schema";
import type { TFormularioProveedor } from "../../proveedores/api/proveedores.schema";
import type { TRespuestaProducto } from "../../productos/api/productos.schema";

export type TPaquete = {
  PaqueteID: number;
  ProductoID: number;
  Nombre: string;
  Descripcion: string | null;
  UnidadesTotales: number;
  PrecioVenta: string;
  MedidaBase: number | null;
  productos: TRespuestaProducto;
};

export type TRespuestaPaquete = {
  ProveedorPaqueteID: number;
  ProveedorID: number;
  PaqueteID: number;
  PrecioCompra: string;
  Notas: string | null;
  proveedores: TFormularioProveedor & { ProveedorID: number };
  paquetes: TPaquete & { paquetes: TPaquete | null };
};

export const verPaquetes = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TRespuestaPaquete[] | []>
    >(RUTAS.PAQ);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const crearPaquetes = async (paquete: TPaqueteFormularioCrear) => {
  try {
    const respuesta = await API.post(RUTAS.PAQ, paquete);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const buscarPaquete = async (id: id) => {
  try {
    const respuesta = await API.get<APIRespuestaObjeto<TRespuestaPaquete>>(
      `${RUTAS.PAQ_BSR}${id}`,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export type actualizarPaqueteSolicitud = TPaqueteFormularioEditar & {
  PaqueteID: id;
};
export const actualizarPaquete = async (
  paquete: actualizarPaqueteSolicitud,
) => {
  try {
    const { PaqueteID, ...paqueteNuevo } = paquete;
    const respuesta = await API.put(
      `${RUTAS.PAQ_BSR}${PaqueteID}`,
      paqueteNuevo,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
