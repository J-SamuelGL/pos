import API from "../../lib/axios";
import type {
  logeoSolicitud,
  actualizarClaveSolicitud,
} from "./tiposAutentificacion";
import { getError } from "../../utils/errores";
import type {
  APIRespuestaSimple,
  APIRespuestaObjeto,
} from "../../utils/globales";
import { RUTAS } from "../../utils/globales";
import { type empleado } from "./apiIdentificacion";

export const logeo = async (logeoSolicitud: logeoSolicitud) => {
  try {
    const respuesta = await API.post<APIRespuestaObjeto<empleado>>(
      RUTAS.AUTH,
      logeoSolicitud,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};

export const actualizarClave = async (
  actualizarClaveSolicitud: actualizarClaveSolicitud,
) => {
  try {
    const respuesta = await API.put<APIRespuestaSimple>(
      RUTAS.AUTH,
      actualizarClaveSolicitud,
    );
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const anularTokens = async () => {
  try {
    const respuesta = await API.get<APIRespuestaSimple>(RUTAS.AUTH);

    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const refrescarTokenAcceso = async () => {
  try {
    const respuesta = await API.get<APIRespuestaSimple>(RUTAS.AUTH_RFS);
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};
