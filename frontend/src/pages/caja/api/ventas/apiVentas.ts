import API from "../../../../lib/axios";
import {
  RUTAS,
  type APIRespuestaSimple,
  type APIRespuestaObjeto,
  type id,
} from "../../../../utils/globales";
import { getError } from "../../../../utils/errores";
import { type TVenta } from "./venta.schema";
import { type TRespuestaPaqueteSinAnidados } from "../../../inventario/index/api/apiCompras";
import { type TRespuestaProducto } from "../../../inventario/productos/api/productos.schema";

export const crearVenta = async (venta: TVenta) => {
  try {
    const respuesta = await API.post<APIRespuestaSimple>(RUTAS.VENT, venta);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export type TVentasRespuesta = {
  VentaID: number;
  EmpleadoID: number;
  FechaHora: Date;
  NIT: string;
  Total: string;
  Notas: string | null;
  detallesventa: {
    VentaID: number;
    PaqueteID: number | null;
    ProductoID: number | null;
    PrecioVenta: string;
    Subtotal: string;
    Cantidad: number;
    IVA: string | null;
    DetalleVentaID: number;
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
};

export const verVentas = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TVentasRespuesta[] | [] | undefined>
    >(RUTAS.VENT);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export type TDetalleVentaRespuesta = {
  DetalleVentaID: number;
  VentaID: number;
  PaqueteID: number | null;
  ProductoID: number | null;
  PrecioVenta: string;
  Subtotal: string;
  Cantidad: number;
  Utilidad: string;
  proveedorespaquetes: TRespuestaPaqueteSinAnidados;
  productos: TRespuestaProducto;
};

export const buscarDetalles = async (id: id) => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<TDetalleVentaRespuesta[] | [] | undefined>
    >(`${RUTAS.VENT_BSR}${id}`);
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
