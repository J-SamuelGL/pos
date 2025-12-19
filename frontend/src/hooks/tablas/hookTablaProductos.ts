import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { TRespuestaProducto } from "../../pages/inventario/productos/api/productos.schema";

const columnasHelper = createColumnHelper<TRespuestaProducto>();

const columnas = [
  columnasHelper.accessor("Nombre", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("Descripcion", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("PrecioVenta", {
    cell: (info) => info.getValue(),
  }),
];

const useTablaProductos = (
  productos: TRespuestaProducto[] | [] | undefined,
) => {
  const tabla = useReactTable({
    data: productos || [],
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return tabla;
};

export default useTablaProductos;
