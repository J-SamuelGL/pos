import API from "../../../lib/axios";
import { RUTAS, type APIRespuestaObjeto } from "../../../utils/globales";
import { getError } from "../../../utils/errores";

type TProductoReporte = {
  Nombre: string;
  TotalUnidadesVendidas: string;
};

type TVentasPorMes = {
  Mes: string;
  TotalVentas: string;
};

type TBalance = {
  Nombre: string;
  Total: string;
};

export type TRespuestaReportes = {
  ventasHoy: [{ Total: string }];
  balance: TBalance[] | [];
  gananciaMes: [{ Ganancia: string }];
  top10Productos: TProductoReporte[] | [];
  ventasPorMes: TVentasPorMes[] | [];
};

export const getReportes = async () => {
  try {
    const respuesta = await API.post<APIRespuestaObjeto<TRespuestaReportes>>(
      RUTAS.REP,
      {
        year: new Date().getFullYear(),
      },
    );
    return respuesta.data;
  } catch (error) {
    getError(error);
  }
};
