import { useTablaVentas } from "../hookTablaVentas";
import { flexRender } from "@tanstack/react-table";

type props = {
  tabla: ReturnType<typeof useTablaVentas>;
  setAbierto: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
};

const TablaVentas = ({ tabla, setAbierto, setId }: props) => {
  return (
    <>
      {/* Desktop Table */}
      <table className="hidden w-full rounded-md bg-white shadow-sm md:table">
        <thead className="sticky top-[50px]">
          {tabla.getHeaderGroups().map((encabezados) => (
            <tr
              key={encabezados.id}
              className="bg-gray-200 text-center font-medium"
            >
              {encabezados.headers.map((encabezado) => (
                <th key={encabezado.id} className="px-4 py-2">
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
              onClick={() => {
                setId(fila.original.VentaID);
                setAbierto(true);
              }}
              className="h-16 cursor-pointer hover:bg-slate-50"
            >
              {fila.getVisibleCells().map((celda) => (
                <td key={celda.id} className="border-2 border-gray-200 px-4">
                  {flexRender(celda.column.columnDef.cell, celda.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {tabla.getRowModel().rows.map((fila) => (
          <div
            key={fila.id}
            onClick={() => {
              setId(fila.original.VentaID);
              setAbierto(true);
            }}
            className="cursor-pointer rounded-md bg-white p-4 shadow-sm hover:bg-slate-50"
          >
            <div className="space-y-2">
              {fila.getVisibleCells().map((celda, index) => {
                const header = tabla.getHeaderGroups()[0].headers[index];
                return (
                  <div key={celda.id} className="text-sm">
                    <span className="font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      :{" "}
                    </span>
                    <span>
                      {flexRender(
                        celda.column.columnDef.cell,
                        celda.getContext(),
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default TablaVentas;
