import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TRespuestaReportes } from "../apiReportes";

type props = {
  reportes: TRespuestaReportes;
};

const Grafica = ({ reportes }: props) => {
  return (
    <article className="mb-8 h-96 overflow-x-auto rounded-md border border-gray-200 p-4 sm:mb-0 sm:h-auto sm:overflow-y-auto">
      <div className="h-full w-[700px]">
        <h1 className="dashboard-tarjeta-titulo">Ventas por mes</h1>
        {reportes.ventasPorMes.length == 0 ? (
          <article className="flex h-full items-center justify-center underline decoration-amber-200">
            <p>Aun no hay datos para mostrar</p>
          </article>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportes.ventasPorMes}>
              <Bar dataKey="Total" fill="#8884d8" />
              <XAxis dataKey="Mes" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </article>
  );
};
export default Grafica;
