import ProductosGrid from "./components/ProductosGrid";
import useTablaProductos from "../../../hooks/tablas/hookTablaProductos";
import { useProductosFull } from "../productos/hooks/hookProductos";
import IconoCargando from "../../../../public/svg/IconoCargando";

const InventarioProductos = () => {
  const { data: productos, isLoading } = useProductosFull();
  const tabla = useTablaProductos(productos?.objeto);
  if (isLoading || !productos?.objeto)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  return (
    <main className="contenido-inventario">
      <ProductosGrid tabla={tabla} />
    </main>
  );
};
export default InventarioProductos;
