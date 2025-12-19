import type { Table } from "@tanstack/react-table";
import IconoBuscar from "../../public/svg/IconoBuscar";

type props = {
  tabla: Table<any>;
};
const BarraBusqueda = ({ tabla }: props) => {
  return (
    <>
      <section className="flex h-full items-center rounded-lg focus-within:outline-2 focus-within:outline-sky-600">
        <input
          type="text"
          id="busqueda"
          className="h-full grow rounded-l-lg bg-zinc-100 p-1 pl-4"
          onChange={(e) => tabla.setGlobalFilter(String(e.target.value))}
          placeholder="Buscar"
          autoComplete="off"
        />
        <figure className="flex h-full rounded-r-lg bg-gray-400 p-1">
          <IconoBuscar />
        </figure>
      </section>
    </>
  );
};
export default BarraBusqueda;
