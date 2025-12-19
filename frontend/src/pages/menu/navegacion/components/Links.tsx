import { Link } from "@tanstack/react-router";
import IconoDashboard from "../../../../../public/svg/IconoDashboard";
import IconoEmpleados from "../../../../../public/svg/IconoEmpleados";
import IconoProductos from "../../../../../public/svg/IconoProductos";
import IconoCaja from "../../../../../public/svg/IconoCaja";
import IconoHistorialVentas from "../../../../../public/svg/IconoHistorialVentas";
import IconoHistorialCompras from "../../../../../public/svg/IconoHistorialCompras";

const estiloActivo =
  "bg-indigo-200 flex gap-4 text-indigo-900 font-bold sm:text-sm hover:bg-indigo-200";
const estilo =
  "flex w-full items-center lg:p-4 text-lg gap-4 rounded-md sm:text-sm sm:p-2 hover:bg-indigo-100";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
};

const Links = ({ setActivo }: props) => {
  return (
    <ul className="flex flex-col gap-4 sm:gap-2">
      <li>
        <Link
          to="/"
          className={estilo}
          activeProps={{ className: estiloActivo }}
          onClick={() => setActivo(false)}
        >
          <IconoDashboard />
          <p>Dashboard</p>
        </Link>
      </li>
      <li>
        <Link
          to="/empleados"
          className={estilo}
          activeProps={{
            className: estiloActivo,
          }}
          onClick={() => setActivo(false)}
        >
          <IconoEmpleados />
          <p>Empleados</p>
        </Link>
      </li>
      <li>
        <Link
          to="/inventario"
          className={estilo}
          activeProps={{ className: estiloActivo }}
          onClick={() => setActivo(false)}
        >
          <IconoProductos />
          <p>Inventario</p>
        </Link>
      </li>
      <li>
        <Link
          to="/caja"
          className={estilo}
          activeProps={{ className: estiloActivo }}
          onClick={() => setActivo(false)}
        >
          <IconoCaja />
          <p>Caja</p>
        </Link>
      </li>
      <li>
        <Link
          to="/historial/ventas"
          className={estilo}
          activeProps={{ className: estiloActivo }}
          onClick={() => setActivo(false)}
        >
          <IconoHistorialVentas />
          <p>Historial de ventas</p>
        </Link>
      </li>
      <li>
        <Link
          to="/historial/compras"
          className={estilo}
          activeProps={{ className: estiloActivo }}
          onClick={() => setActivo(false)}
        >
          <IconoHistorialCompras />
          <p>Historial de compras</p>
        </Link>
      </li>
    </ul>
  );
};
export default Links;
