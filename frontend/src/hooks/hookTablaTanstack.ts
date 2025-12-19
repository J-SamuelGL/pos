import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type TableOptions,
  getPaginationRowModel,
} from "@tanstack/react-table";

type UseTablaGenericaProps<TData> = {
  data: TData[] | undefined;
  columnas: ColumnDef<TData, any>[];
  opciones?: Partial<
    Omit<TableOptions<TData>, "data" | "columns" | "getCoreRowModel">
  >;
};

export const useTablaGenerica = <TData>({
  data,
  columnas,
  opciones = {},
}: UseTablaGenericaProps<TData>) => {
  const tabla = useReactTable({
    data: data || [],
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
    ...opciones,
  });

  return tabla;
};
