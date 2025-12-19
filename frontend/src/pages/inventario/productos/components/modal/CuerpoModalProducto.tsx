import { Link } from "@tanstack/react-router";
import IconoCargando from "../../../../../../public/svg/IconoCargando";
import type { TRespuestaProductoBuscar } from "../../api/productos.schema";
import EncabezadoModalProducto from "./EncabezadoModalProducto";
import MayoreoModalProducto from "./MayoreoModalProducto";

type props = {
  producto: TRespuestaProductoBuscar;
};

const CuerpoModalProducto = ({ producto }: props) => {
  if (!producto)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  return (
    <>
      <EncabezadoModalProducto producto={producto} />
      <MayoreoModalProducto producto={producto} />
      <div className="mt-8 flex w-full rounded-md bg-yellow-100 p-2 text-center inset-ring hover:shadow-md">
        <Link
          to="/inventario/productos/editar/$ID"
          params={{ ID: producto?.ProductoID as any }}
          className="grow"
        >
          Editar
        </Link>
      </div>
    </>
  );
};
export default CuerpoModalProducto;
