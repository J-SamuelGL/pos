import type { TRespuestaProducto } from "../../api/productos.schema";

type props = {
  producto: TRespuestaProducto;
};

const EncabezadoModalProducto = ({ producto }: props) => {
  return (
    <header>
      <figure className="h-80 w-full rounded-t-lg bg-gray-400"></figure>
      <section className="flex items-end gap-25">
        <h2 className="text-2xl font-extrabold">
          {`Q.${producto?.PrecioVenta}`}
        </h2>
        <h2 className="underline">{`${producto?.Cantidad || 0} unidades disponibles`}</h2>
      </section>
      <h2 className="text-lg font-semibold">Descripción</h2>
      <p className="mb-4">{producto?.Descripcion || "Sin descripción"}</p>
    </header>
  );
};
export default EncabezadoModalProducto;
