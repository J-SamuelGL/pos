import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { type TVentasRespuesta } from "../caja/api/ventas/apiVentas";

// ventas
const columnasHelper = createColumnHelper<TVentasRespuesta>();

const columnas = [
  columnasHelper.accessor("VentaID", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("FechaHora", {
    header: () => "Fecha y Hora",
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("Total", {
    cell: (info) => "Q." + info.getValue(),
  }),
  columnasHelper.accessor("empleados.Nombres", {
    header: () => "Empleado",
    cell: (info) => info.getValue(),
  }),
];

export const useTablaVentas = (ventas: TVentasRespuesta[] | [] | undefined) => {
  const tabla = useReactTable({
    data: ventas || [],
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return tabla;
};
