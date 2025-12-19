import { Link } from "@tanstack/react-router";
import IconoHamburguesa from "../../../../../public/svg/IconoHamburguesa";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
};

const PanelNavegacion = ({ setActivo }: props) => {
  return (
    <nav className="h-barra-inventario-altura sticky top-0 z-20 flex w-full items-center bg-slate-300 shadow-sm">
      <div
        className="ml-2 self-center hover:cursor-pointer"
        onClick={() => {
          setActivo(true);
        }}
      >
        <IconoHamburguesa />
      </div>
      <ul className="flex h-full w-full items-center justify-between px-[25vw]">
        <li>
          <Link
            to="/inventario"
            className="link-inventario"
            activeProps={{ className: "link-inventario-activo" }}
            activeOptions={{ exact: true }}
          >
            Registrar compra
          </Link>
        </li>
        <li>
          <Link
            to="/inventario/productos"
            className="link-inventario"
            activeProps={{ className: "link-inventario-activo" }}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/inventario/proveedores"
            className="link-inventario"
            activeProps={{ className: "link-inventario-activo" }}
          >
            Proveedores
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default PanelNavegacion;
