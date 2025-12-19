import IconoCargando from "../../../../../../public/svg/IconoCargando";
import { getFormatoNumerico } from "../../../../../utils/dinero";
import { useVenta } from "../../../api/ventas/venta.store";
import { useVentasCrear } from "../../../hooks/hookVentas";

type props = {
  setModalProducto: React.Dispatch<React.SetStateAction<boolean>>;
  setModalClientes: React.Dispatch<React.SetStateAction<boolean>>;
  setProductoID: React.Dispatch<React.SetStateAction<number | null>>;
};

const Nota = ({ setModalProducto, setProductoID, setModalClientes }: props) => {
  const { DetallesVenta, limpiar, Total } = useVenta((estado) => estado);
  const { isPending } = useVentasCrear();

  return (
    <aside className="w-nota-ancho top-barra-inventario-altura fixed right-0 flex h-[calc(100vh-var(--spacing-barra-inventario-altura))] flex-col border-l-2 border-l-gray-200 bg-white">
      {/* encabezado */}
      <header>
        <h1>Nota de venta</h1>
        <button
          disabled={!DetallesVenta.length}
          className="botonNeutral mt-1 w-full bg-yellow-400 p-2"
          onClick={() => {
            limpiar();
          }}
        >
          Limpiar
        </button>
      </header>
      {/* cuerpo */}
      <section className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
        {/* renderizar detalles */}
        {DetallesVenta.map((detalle) => (
          <article
            key={detalle.NombrePaquete || detalle.NombreProducto}
            className="hover:border-l-acento flex flex-col rounded-md border-2 border-gray-200 bg-white p-2 hover:cursor-pointer"
            onClick={() => {
              setModalProducto(true);
              setProductoID(detalle.ProductoID);
            }}
          >
            <h2 className="font-extrabold">
              Subtotal: Q.{getFormatoNumerico(detalle.Subtotal)}
            </h2>
            <h1 className="font-medium">
              {detalle.NombrePaquete || detalle.NombreProducto}
            </h1>
            <h2 className="self-end underline">
              {`${getFormatoNumerico(detalle.Cantidad)} ${detalle.PaqueteID ? "paquetes" : "unidades"}`}
            </h2>
          </article>
        ))}
      </section>
      {/* pie */}
      <footer className="w-full border-t-2 bg-white">
        {/* Total */}
        <article className="flex items-center justify-between px-1">
          <h2 className="text-xl font-light">TOTAL</h2>
          <strong className="text-2xl">Q.{getFormatoNumerico(Total)}</strong>
        </article>
        <button
          className="botonNeutral w-full p-4"
          disabled={!DetallesVenta.length || isPending}
          onClick={() => setModalClientes(true)}
        >
          {isPending ? (
            <span className="flex justify-center">
              <IconoCargando boton={true} />
            </span>
          ) : (
            "Finalizar"
          )}
        </button>
      </footer>
    </aside>
  );
};
export default Nota;
