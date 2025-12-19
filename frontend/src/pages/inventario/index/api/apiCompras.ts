import API from "../../../../lib/axios";
import {
  RUTAS,
  type APIRespuestaSimple,
  type APIRespuestaObjeto,
  type id,
} from "../../../../utils/globales";
import { getError } from "../../../../utils/errores";
import { type TCompra } from "./compra.schema";
import {
  type TPaquete,
  type TRespuestaPaquete,
} from "../../paquetes/api/apiPaquetes";

export const crearCompra = async (compra: TCompra) => {
  try {
    const respuesta = await API.post<APIRespuestaSimple>(RUTAS.COMP, compra);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export type TCompraRespuesta = {
  detallescompra: {
    CompraID: number;
    PaqueteID: number;
    PrecioCompra: string;
    Cantidad: number;
    Subtotal: string;
    DetalleCompraID: number;
  }[];
  empleados: {
    EmpleadoID: number;
    RolID: number;
    Nombres: string;
    Apellidos: string;
    Usuario: string;
    Clave: string;
    VersionToken: number | null;
    FechaCreacion: Date;
    Imagen: string | null;
  };
  CompraID: number;
  ProveedorID: number | null;
  EmpleadoID: number;
  FechaHora: Date;
  Total: string;
  NIT: string;
  Direccion: string | null;
  Notas: string | null;
};

export const verCompras = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TCompraRespuesta[] | [] | undefined>
    >(RUTAS.COMP);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export type TRespuestaPaqueteSinAnidados = Omit<
  TRespuestaPaquete,
  "proveedores" | "paquetes"
> & {
  paquetes: Omit<TPaquete, "paquetes" | "productos">;
};

export type TDetalleCompraRespuesta = {
  DetalleCompraID: number;
  CompraID: number;
  PaqueteID: number;
  PrecioCompra: string;
  Cantidad: number;
  Subtotal: string;
  proveedorespaquetes: TRespuestaPaqueteSinAnidados;
};

export const buscarDetalles = async (id: id) => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TDetalleCompraRespuesta[] | [] | undefined>
    >(`${RUTAS.COMP_BSR}${id}`);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
