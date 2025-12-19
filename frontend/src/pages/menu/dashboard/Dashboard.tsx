import { useReportes } from "./hookReportes";
import IconoCargando from "../../../../public/svg/IconoCargando";
import Tarjetas from "./components/Tarjetas";
import Grafica from "./components/Grafica";
import TopProductos from "./components/TopProductos";

const Dashboard = () => {
  const { data: reportes, isLoading } = useReportes();

  if (isLoading || !reportes)
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-menu flex flex-col gap-4 sm:h-screen">
      <Tarjetas reportes={reportes.objeto} />
      <section className="min-h-0 sm:mb-0 sm:grid sm:h-full sm:grid-cols-2 sm:grid-rows-1 sm:gap-4 sm:rounded-md">
        <Grafica reportes={reportes.objeto} />
        <TopProductos reportes={reportes.objeto} />
      </section>
    </main>
  );
};
export default Dashboard;
