import ProductoSeleccion from "./ProductoSeleccion";
import { useState } from "react";
import ModalEntidad from "../../../../components/modales/ModalEntidad";
import useTablaProductos from "../../../../hooks/tablas/hookTablaProductos";
import { useProductoBuscar } from "../../productos/hooks/hookProductos";
import CuerpoModalProducto from "./modal/CuerpoModalProducto";
import { Link } from "@tanstack/react-router";
import IconoCrear from "../../../../../public/svg/IconoCrear";
import BarraBusqueda from "../../../../components/BarraBusqueda";

type props = {
  tabla: ReturnType<typeof useTablaProductos>;
};

const ProductosGrid = ({ tabla }: props) => {
  const [abierto, setAbierto] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const { data: producto } = useProductoBuscar(id);
  return (
    <>
      <header className="mb-2 flex items-center justify-between">
        <h1>Productos</h1>
        <section className="flex gap-4">
          <Link
            to="/inventario/productos/crear"
            className="flex items-center rounded-lg border-2 bg-indigo-200 p-2 hover:shadow-lg"
          >
            <IconoCrear />
            Crear producto
          </Link>
          <Link
            to="/inventario/paquetes/crear"
            className="flex items-center rounded-lg border-2 bg-indigo-200 p-2 hover:shadow-lg"
          >
            <IconoCrear />
            Crear paquete
          </Link>
        </section>
      </header>
      <BarraBusqueda tabla={tabla} />
      <section className="mt-2 grid grid-cols-4 gap-2 pb-4">
        {tabla.getRowModel().rows.map((row) => (
          <article
            className="tarjeta p-2 hover:cursor-pointer"
            key={row.original.ProductoID}
            onClick={() => {
              setAbierto(true);
              setId(row.original.ProductoID);
            }}
          >
            <ProductoSeleccion producto={row.original} />
          </article>
        ))}
      </section>
      <ModalEntidad
        activo={abierto}
        setActivo={setAbierto}
        setID={setId}
        titulo={producto?.objeto?.Nombre}
      >
        <CuerpoModalProducto producto={producto?.objeto as any} />
      </ModalEntidad>
    </>
  );
};
export default ProductosGrid;
