import API from "../../../../lib/axios";
import {
  RUTAS,
  type APIRespuestaObjeto,
  type APIRespuestaSimple,
} from "../../../../utils/globales";
import { getError } from "../../../../utils/errores";
import { type TCliente } from "./clientes.schema";

export const mostrarClientes = async () => {
  try {
    const respuesta = await API.get<APIRespuestaObjeto<TCliente[] | []>>(
      RUTAS.CLI,
    );
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const crearClientes = async (cliente: TCliente) => {
  try {
    const respuesta = await API.post<APIRespuestaSimple>(RUTAS.CLI, cliente);
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};
