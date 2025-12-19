import useTablaProductos from "../../../../../hooks/tablas/hookTablaProductos";
import { getFormatoNumerico } from "../../../../../utils/dinero";

type props = {
  tabla: ReturnType<typeof useTablaProductos>;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  setID: React.Dispatch<React.SetStateAction<number | null>>;
};

const Grid = ({ tabla, setActivo, setID }: props) => {
  return (
    <main className="cuadricula m-4 mr-[calc(20px+var(--spacing-nota-ancho))]">
      {tabla.getRowModel().rows.map((producto) => (
        <article
          className="tarjeta hover:cursor-pointer"
          key={producto.original.ProductoID}
          onClick={() => {
            setID(producto.original.ProductoID);
            setActivo(true);
          }}
        >
          <figure className="relative h-40 w-full bg-slate-200">
            <figure className="absolute right-2 bottom-2 rounded-lg border-2 border-zinc-300 bg-indigo-200 px-2 text-sm">
              {getFormatoNumerico(producto.original.Cantidad)} existencias
            </figure>
          </figure>
          <section className="px-2 py-2">
            <h1>Q.{getFormatoNumerico(producto.original.PrecioVenta)}</h1>
            <h2>{producto.original.Nombre}</h2>
          </section>
        </article>
      ))}
    </main>
  );
};
export default Grid;
