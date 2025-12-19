import { Link } from "@tanstack/react-router";
import type { empleadoBuscarEmpleado } from "../../api/empleados.tipos";
import IconoEditar from "../../../../../public/svg/IconoEditar";

type props = {
  empleado: empleadoBuscarEmpleado;
};

const Encabezado = ({ empleado }: props) => {
  return (
    <header className="tarjeta relative mt-12 mb-10 flex flex-col items-center rounded-2xl">
      <figure className="absolute bottom-20 h-30 w-30 rounded-full bg-[url(/usuario-default.png)] bg-size-[125px]"></figure>
      <Link
        className="botonNeutral absolute top-2 right-2 w-10"
        to="/empleados/editar/$ID"
        params={{ ID: String(empleado.EmpleadoID) }}
      >
        <IconoEditar />
      </Link>
      <h1 className="mt-22">{`${empleado.Nombres} ${empleado.Apellidos}`}</h1>
      <h2 className="mb-4">{empleado.roles.Nombre}</h2>
    </header>
  );
};
export default Encabezado;
