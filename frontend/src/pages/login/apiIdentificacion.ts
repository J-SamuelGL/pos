import API from "../../lib/axios";
import { RUTAS, type APIRespuestaObjeto } from "../../utils/globales";
import { getError } from "../../utils/errores";

export interface empleado {
  EmpleadoID: number;
  Nombres: string;
  Apellidos: string;
  Usuario: string;
  roles: { Nombre: string };
}

export const mostrarIdentificacion = async () => {
  try {
    const { data } = await API.get<APIRespuestaObjeto<empleado>>(RUTAS.IDEN);
    return data;
  } catch (e) {
    getError(e);
  }
};
