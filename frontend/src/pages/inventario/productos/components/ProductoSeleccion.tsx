import type { TRespuestaProducto } from "../api/productos.schema";

type props = {
  producto: TRespuestaProducto;
};

const ProductoSeleccion = ({ producto }: props) => {
  return (
    <>
      <figure className="h-30 w-full rounded-t-lg bg-gray-400"></figure>
      <h2 className="font-bold">{`Q.${producto.PrecioVenta}`}</h2>
      <h3>{producto.Nombre}</h3>
      <hr className="mb-1" />
      <h4 className="text-sm">
        Unidades <span className="font-medium">{producto.Cantidad}</span>
      </h4>
    </>
  );
};
export default ProductoSeleccion;
