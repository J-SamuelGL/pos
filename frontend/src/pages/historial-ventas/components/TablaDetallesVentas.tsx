import IconoCargando from "../../../../public/svg/IconoCargando";
import { type TDetalleVentaRespuesta } from "../../caja/api/ventas/apiVentas";

type props = {
  detalles: TDetalleVentaRespuesta[] | [] | undefined;
};

const TablaDetallesVentas = ({ detalles }: props) => {
  if (!detalles) {
    return (
      <div className="centrar">
        <IconoCargando />;
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <table className="hidden w-full rounded-md bg-white shadow-sm md:table">
        <thead className="sticky top-[50px]">
          <tr className="bg-gray-200 text-center font-medium">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <tr
              className="h-16 hover:cursor-pointer hover:bg-slate-50"
              key={detalle.DetalleVentaID}
            >
              {detalle.PaqueteID ? (
                <>
                  <td className="border-2 border-gray-200 px-4">
                    {detalle.proveedorespaquetes.paquetes.Nombre}
                  </td>
                  <td className="border-2 border-gray-200 px-4 text-center">
                    {detalle.Cantidad}
                  </td>
                  <td className="border-2 border-gray-200 px-4 text-center">
                    Q.{detalle.Subtotal}
                  </td>
                </>
              ) : (
                <>
                  <td className="border-2 border-gray-200 px-4">
                    {detalle.productos?.Nombre}
                  </td>
                  <td className="border-2 border-gray-200 px-4 text-center">
                    {detalle.Cantidad}
                  </td>
                  <td className="border-2 border-gray-200 px-4 text-center">
                    Q.{detalle.Subtotal}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {detalles.map((detalle) => (
          <div
            key={detalle.DetalleVentaID}
            className="rounded-md bg-white p-4 shadow-sm hover:cursor-pointer hover:bg-slate-50"
          >
            <div className="mb-2 text-lg font-medium">
              {detalle.proveedorespaquetes?.paquetes?.Nombre ||
                detalle.productos?.Nombre}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <span className="font-medium">Cantidad:</span>{" "}
                {detalle.Cantidad}
              </div>
              <div>
                <span className="font-medium">Subtotal:</span> Q.
                {detalle.Subtotal}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default TablaDetallesVentas;
