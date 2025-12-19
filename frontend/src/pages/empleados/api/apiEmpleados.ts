import API from "../../../lib/axios";
import { RUTAS, type APIRespuestaObjeto } from "../../../utils/globales";
import { getError } from "../../../utils/errores";
import type {
  empleadoMostrarEmpleados,
  crearEmpleadoSolicitud,
  buscarEmpleadoSolicitud,
  empleadoBuscarEmpleado,
  actualizarEmpleadoSolicitud,
  verRolesRespuesta,
} from "./empleados.tipos";

export const mostrarEmpleados = async () => {
  try {
    const respuesta = await API.get<
      APIRespuestaObjeto<empleadoMostrarEmpleados[] | []>
    >(RUTAS.EMPL);
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const crearEmpleado = async (
  crearEmpleadoSolicitud: crearEmpleadoSolicitud,
) => {
  try {
    const respuesta = await API.post(RUTAS.EMPL, crearEmpleadoSolicitud);
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const buscarEmpleado = async (
  buscarEmpleadoSolicitud: buscarEmpleadoSolicitud,
) => {
  try {
    const respuesta = await API.get<APIRespuestaObjeto<empleadoBuscarEmpleado>>(
      `${RUTAS.EMPL_BSR}${buscarEmpleadoSolicitud}`,
    );
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const actualizarEmpleado = async (
  actualizarEmpleadoSolicitud: actualizarEmpleadoSolicitud,
) => {
  try {
    const { id, ...Empleado } = actualizarEmpleadoSolicitud;
    const respuesta = await API.put(`${RUTAS.EMPL_BSR}${id}`, Empleado);
    return respuesta.data;
  } catch (e) {
    getError(e);
  }
};

export const verRoles = async () => {
  try {
    const respuesta = await API.get<APIRespuestaObjeto<verRolesRespuesta[]>>(
      RUTAS.ROLS,
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
