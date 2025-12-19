import type { TRespuestaReportes } from "../apiReportes";
import { getFormatoNumerico } from "../../../../utils/dinero";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type props = {
  reportes: TRespuestaReportes;
};

const getColor = (nombre: string) => {
  if (nombre === "Ventas") return "#22c55e";
  if (nombre === "Compras") return "#ef4444";
  return "#8884d8";
};

// Estilos
const tarjeta = "rounded-lg border border-gray-200 p-4";
const tarjetaMonto = "text-2xl font-bold  text-green-900";

const Tarjetas = ({ reportes }: props) => {
  const balanceDatos = reportes.balance.map((item) => ({
    ...item,
    Total: Number(item.Total),
  }));
  console.log(balanceDatos);

  return (
    <section className="flex min-h-0 flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-4">
      {/* Total vendido */}
      <article className={tarjeta}>
        <h1 className="dashboard-tarjeta-titulo">Total vendido hoy</h1>
        <h2 className={tarjetaMonto}>
          Q.
          {getFormatoNumerico(reportes.ventasHoy[0].Total)}
        </h2>
      </article>

      {/* Balance Pie */}
      <article
        className={`${tarjeta} row-span-2 h-96 overflow-y-auto sm:h-full`}
      >
        <h1 className="dashboard-tarjeta-titulo">Balance</h1>
        {!reportes.balance[0].Total && !reportes.balance[1].Total && (
          <article className="flex h-full items-center justify-center underline decoration-amber-200">
            <p>Aun no hay datos para mostrar</p>
          </article>
        )}
        <div className="h-[500px]">
          {reportes.balance[0].Total && reportes.balance[1].Total && (
            <ResponsiveContainer width="100%">
              <PieChart height={100}>
                <Pie data={balanceDatos} dataKey="Total" nameKey="Nombre" label>
                  {balanceDatos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.Nombre)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      {/* Ganancia */}
      <article className={tarjeta}>
        <h1 className="dashboard-tarjeta-titulo">Ganancia del mes</h1>
        <h2 className={tarjetaMonto}>
          Q.
          {getFormatoNumerico(reportes.gananciaMes[0].Ganancia)}
        </h2>
      </article>
    </section>
  );
};
export default Tarjetas;
