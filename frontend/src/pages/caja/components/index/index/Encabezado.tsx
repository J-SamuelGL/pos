import IconoHamburguesa from "../../../../../../public/svg/IconoHamburguesa";
import BarraBusqueda from "../../../../../components/BarraBusqueda";
import type { TRespuestaProducto } from "../../../../inventario/productos/api/productos.schema";
import { type Table } from "@tanstack/react-table";

type props = {
  tabla: Table<TRespuestaProducto>;
  setOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const Encabezado = ({ tabla, setOffcanvas }: props) => {
  return (
    <>
      <header className="h-encabezado-caja-altura sticky top-0 z-10 flex bg-white p-1">
        <figure
          className="flex h-full px-2 hover:cursor-pointer"
          onClick={() => {
            setOffcanvas(true);
          }}
        >
          <IconoHamburguesa />
        </figure>
        <section className="h-full grow">
          <BarraBusqueda tabla={tabla} />
        </section>
      </header>
    </>
  );
};
export default Encabezado;
