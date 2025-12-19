import type { Table } from "@tanstack/react-table";
import type { empleadoMostrarEmpleados } from "../../api/empleados.tipos";

type props = {
  tabla: Table<empleadoMostrarEmpleados>;
};

const Pie = ({ tabla }: props) => {
  return (
    <footer className="mt-4 flex justify-between px-8 sm:mt-8">
      <button
        className="botonNeutral w-10"
        onClick={() => tabla.previousPage()}
        disabled={!tabla.getCanPreviousPage()}
      >
        &lt;
      </button>
      <button
        className="botonNeutral w-10"
        onClick={() => tabla.nextPage()}
        disabled={!tabla.getCanNextPage()}
      >
        &gt;
      </button>
    </footer>
  );
};
export default Pie;
