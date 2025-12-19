import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { type TCompraRespuesta } from "../inventario/index/api/apiCompras";

// compras
const columnasHelper = createColumnHelper<TCompraRespuesta>();

const columnas = [
  columnasHelper.accessor("CompraID", {
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

export const useTablaCompras = (
  compras: TCompraRespuesta[] | [] | undefined,
) => {
  const tabla = useReactTable({
    data: compras || [],
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return tabla;
};
