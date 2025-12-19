import { createColumnHelper } from "@tanstack/react-table";
import { type empleadoMostrarEmpleados } from "../api/empleados.tipos";
import { useTablaGenerica } from "../../../hooks/hookTablaTanstack";

const columnasHelper = createColumnHelper<empleadoMostrarEmpleados>();

const columnas = [
  columnasHelper.accessor("EmpleadoID", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("Nombres", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("Apellidos", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("Usuario", {
    cell: (info) => info.getValue(),
  }),
  columnasHelper.accessor("roles.Nombre", {
    header: () => "Rol",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
];

export const useTablaEmpleados = (
  empleados: empleadoMostrarEmpleados[] | undefined,
) => {
  return useTablaGenerica({
    data: empleados,
    columnas,
  });
};
