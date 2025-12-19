import type { TRespuestaProductoBuscar } from "../../api/productos.schema";
import { useNavigate } from "@tanstack/react-router";
import IconoAdvertencia from "../../../../../../public/svg/IconoAdvertencia";

type props = {
  producto: TRespuestaProductoBuscar;
};

const MayoreoModalProducto = ({ producto }: props) => {
  const navegar = useNavigate();
  return (
    <section>
      <h2 className="text-lg font-semibold">Mayoreo</h2>
      {producto.paquetes.length != 0 ? (
        <table className="mb-4 w-full table-auto">
          <thead>
            <tr className="h-10">
              <th></th>
              <th className="encabezado-tabla-producto-modal">
                Unidades por paquete
              </th>
              <th className="encabezado-tabla-producto-modal">Precio compra</th>
              <th className="encabezado-tabla-producto-modal">Precio venta</th>
            </tr>
          </thead>
          <tbody>
            {producto?.paquetes?.map((paquete) => (
              <tr
                className="h-15 hover:cursor-pointer hover:outline-2 hover:outline-cyan-950"
                onClick={() => {
                  navegar({
                    to: "/inventario/paquetes/editar/$ID",
                    params: { ID: paquete.PaqueteID as any },
                  });
                }}
                key={paquete.PaqueteID}
              >
                <td className="encabezado-tabla-producto-modal bg-blue-100">
                  {paquete.Nombre}
                </td>
                <td className="cuerpo-tabla-producto-moda">
                  {paquete.UnidadesTotales}
                </td>
                <td className="cuerpo-tabla-producto-moda">
                  {`Q.${paquete.proveedorespaquetes[0].PrecioCompra}`}
                </td>
                <td className="cuerpo-tabla-producto-moda">
                  {`Q.${paquete.PrecioVenta}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mb-4 flex items-center gap-2 underline decoration-amber-200 decoration-2">
          <IconoAdvertencia />
          Aún no hay paquetes para este producto
        </p>
      )}
    </section>
  );
};
export default MayoreoModalProducto;
