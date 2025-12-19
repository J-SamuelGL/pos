import type { TRespuestaReportes } from "../apiReportes";

type props = {
  reportes: TRespuestaReportes;
};

const TopProductos = ({ reportes }: props) => {
  return (
    <article className="min-h-40 rounded-md border border-gray-200 p-4 sm:flex sm:h-auto sm:flex-col sm:gap-4 sm:overflow-y-auto sm:p-4">
      <h1 className="dashboard-tarjeta-titulo mb-4 sm:mb-0">Mejor vendidos</h1>
      {reportes.top10Productos.length == 0 && (
        <article className="flex h-full items-center justify-center underline decoration-amber-200">
          <p>Aun no hay datos para mostrar</p>
        </article>
      )}
      {reportes.top10Productos.length != 0 &&
        reportes.top10Productos.map((producto) => (
          <article
            className="shrink-0 rounded-md border-l-2 border-l-indigo-400 p-4 shadow-sm"
            key={producto.Nombre}
          >
            <h1 className="text-lg font-semibold">{producto.Nombre}</h1>
            <h2 className="text-sm">
              vendido {producto.TotalUnidadesVendidas} veces
            </h2>
          </article>
        ))}
    </article>
  );
};
export default TopProductos;
