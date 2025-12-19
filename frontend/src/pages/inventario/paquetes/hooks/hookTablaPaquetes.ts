import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import type { TRespuestaPaquete } from "../api/apiPaquetes";

const columnasHelper = createColumnHelper<TRespuestaPaquete>();

const columnas = [
  columnasHelper.accessor("paquetes.productos.Nombre", {
    id: "NombreProducto",
    cell: (info) => info.getValue(),
    header: () => "Paquete",
    enableColumnFilter: true,
  }),
  columnasHelper.accessor("proveedores.Nombre", {
    cell: (info) => "Q." + info.getValue(),
    header: () => "Compra",
  }),
  columnasHelper.accessor("paquetes.Nombre", {
    cell: (info) => "Q." + info.getValue(),
    header: () => "Compra",
  }),
  columnasHelper.accessor("paquetes.Descripcion", {
    cell: (info) => "Q." + info.getValue(),
    header: () => "Venta",
  }),
  columnasHelper.accessor("paquetes.UnidadesTotales", {
    header: () => "Unidad",
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("PrecioCompra", {
    cell: (info) => info.getValue(),
    header: () => "Contiene",
  }),
  columnasHelper.accessor("paquetes.paquetes.Nombre", {
    cell: (info) => info.getValue() || "N/A",
    header: () => "Medida base",
  }),
];

export const useTablaPaquetes = (
  paquetes: TRespuestaPaquete[] | [] | undefined,
) => {
  const tabla = useReactTable({
    data: paquetes || [],
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      sorting: [
        {
          id: "NombreProducto",
          desc: false,
        },
      ],
    },
  });
  return tabla;
};
