import { useNavigate } from "@tanstack/react-router";
import { flexRender, type Table } from "@tanstack/react-table";
import type { empleadoMostrarEmpleados } from "../../api/empleados.tipos";

type props = {
  tabla: Table<empleadoMostrarEmpleados>;
};

const Tabla = ({ tabla }: props) => {
  const navegar = useNavigate({ from: "/empleados" });

  return (
    <>
      <table className="w-full">
        <thead>
          {tabla.getHeaderGroups().map((encabezados) => (
            <tr key={encabezados.id} className="bg-slate-50">
              {encabezados.headers.map((encabezado) => (
                <th
                  key={encabezado.id}
                  className="px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase first:rounded-tl-lg last:rounded-tr-lg"
                >
                  {flexRender(
                    encabezado.column.columnDef.header,
                    encabezado.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tabla.getRowModel().rows.map((fila) => (
            <tr
              key={fila.id}
              onClick={() =>
                navegar({ to: "$ID", params: { ID: fila.original.EmpleadoID } })
              }
              className="h-16 cursor-pointer border-b-1 border-b-gray-300 hover:bg-indigo-50"
            >
              {fila.getVisibleCells().map((celda) => (
                <td key={celda.id} className="px-6 py-4 text-sm">
                  {flexRender(celda.column.columnDef.cell, celda.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Tabla;
