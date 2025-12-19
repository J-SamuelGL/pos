import { type Table, flexRender } from "@tanstack/react-table";
import { type TRespuestaPaquete } from "../../../paquetes/api/apiPaquetes";
import { useCompra } from "../../index/compra.state";
import IconoCheck from "../../../../../../public/svg/IconoCheck";

type props = {
  tabla: Table<TRespuestaPaquete>;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
};

const TablaPaquetes = ({ tabla, setActivo, setId }: props) => {
  const { DetallesCompra } = useCompra((estado) => estado);

  const verificarExistencia = (id: number, celdaID: number) => {
    if (celdaID != 4) {
      return false;
    }
    const encontrado = DetallesCompra.find(
      (paquete) => paquete.PaqueteID == id,
    );
    return encontrado;
  };

  return (
    <table className="w-full rounded-md bg-white shadow-sm">
      <thead>
        {tabla.getHeaderGroups().map((encabezados) => (
          <tr
            key={encabezados.id}
            className="bg-gray-200 text-center font-medium"
          >
            {encabezados.headers.map((encabezado) => (
              <th key={encabezado.id}>
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
              setActivo(true);
              setId(fila.original.PaqueteID);
            }}
            className="h-16 hover:cursor-pointer hover:bg-slate-50"
          >
            {fila.getVisibleCells().map((celda) => (
              <td key={celda.id} className="relative border-2 border-gray-200">
                {flexRender(celda.column.columnDef.cell, celda.getContext())}
                {verificarExistencia(
                  fila.original.PaqueteID,
                  celda.column.getIndex(),
                ) && (
                  <span className="absolute top-0 right-0 z-10" key={fila.id}>
                    <IconoCheck />
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TablaPaquetes;
