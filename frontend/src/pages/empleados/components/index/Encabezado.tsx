import { Link } from "@tanstack/react-router";
import { type Table } from "@tanstack/react-table";
import BarraBusqueda from "../../../../components/BarraBusqueda";
import IconoCrear from "../../../../../public/svg/IconoCrear";
import { type empleadoMostrarEmpleados } from "../../api/empleados.tipos";

type props = {
  tabla: Table<empleadoMostrarEmpleados>;
};

const Encabezado = ({ tabla }: props) => {
  return (
    <header className="mb-4">
      <section className="mb-4 flex justify-center gap-4 sm:justify-between">
        <h1 className="titulo-contenido">Empleados</h1>
        <Link
          to="/empleados/crear"
          className="flex rounded-lg bg-indigo-200 p-2 sm:static sm:w-15 sm:justify-center"
        >
          <IconoCrear />
        </Link>
      </section>
      <figure className="h-full grow">
        <BarraBusqueda tabla={tabla} />
      </figure>
    </header>
  );
};
export default Encabezado;
