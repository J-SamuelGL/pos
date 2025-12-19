import type {
  TRespuestaProductoBuscar,
  TPaqueteProducto,
} from "../../../../../inventario/productos/api/productos.schema";
import IconoCargando from "../../../../../../../public/svg/IconoCargando";
import { getFormatoNumerico } from "../../../../../../utils/dinero";
import { type TDetalleVentaStore } from "../../../../api/ventas/venta.store";
import Pie from "./Pie";
import { useVenta } from "../../../../api/ventas/venta.store";

type props = {
  producto: TRespuestaProductoBuscar | undefined;
  cargandoProducto: boolean;
};

export type bien = TRespuestaProductoBuscar | TPaqueteProducto;

export const esPaquete = (bien: any): bien is TPaqueteProducto => {
  return "MedidaBase" in bien;
};

export const crearBien = (bien: bien, cantidad: number): TDetalleVentaStore => {
  // ! no se puede obtener a ciencia cierta cual es la utilidad
  if (esPaquete(bien)) {
    const subtotal = cantidad * Number(bien.PrecioVenta);
    return {
      ProductoID: bien.ProductoID,
      PaqueteID: bien.PaqueteID,
      NombrePaquete: bien.Nombre,
      Cantidad: cantidad,
      PrecioVenta: Number(bien.PrecioVenta),
      Subtotal: subtotal,
      Utilidad:
        subtotal - cantidad * Number(bien.proveedorespaquetes[0].PrecioCompra),
      UnidadesEquivalentes: bien.UnidadesTotales * cantidad,
    };
  } else {
    const subtotal = cantidad * Number(bien.PrecioVenta);
    return {
      ProductoID: bien.ProductoID,
      PaqueteID: null,
      NombreProducto: bien.Nombre,
      Cantidad: cantidad,
      PrecioVenta: Number(bien.PrecioVenta),
      Subtotal: subtotal,
      Utilidad:
        subtotal -
        cantidad * Number(bien.paquetes[0].proveedorespaquetes[0].PrecioCompra),
    };
  }
};

const DetallesProducto = ({ producto, cargandoProducto }: props) => {
  const detalles = useVenta((estado) => estado.DetallesVenta);
  if (cargandoProducto) {
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  }

  if (!producto) return null;

  return (
    <>
      <figure className="mb-2 h-50 w-full rounded-t-lg bg-slate-200"></figure>
      {/* unidad */}
      <article className="tarjeta mb-4">
        <header className="p-2x mb-2 rounded-t-lg bg-gray-100">
          <h1 className="ml-2 text-lg font-semibold">Unidad</h1>
        </header>
        <div className="ml-2">
          <section className="flex items-end gap-25">
            <h2 className="text-2xl font-extrabold">
              Q.{getFormatoNumerico(producto.PrecioVenta)}
            </h2>
            <h2 className="underline">
              {getFormatoNumerico(producto.Cantidad)} existencias
            </h2>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Descripción</h2>
            <p className="mb-2">{producto?.Descripcion || "Sin descripción"}</p>
          </section>
          <Pie bien={producto} producto={producto} />
        </div>
      </article>
      {/* mayoreo */}
      <section className="tarjeta">
        <header className="rounded-t-lg bg-gray-100 p-2">
          <h1 className="text-lg font-semibold">Mayoreo</h1>
        </header>
        {producto.paquetes.map((paquete) => (
          <article
            className="linea px-2 py-4 hover:cursor-pointer"
            key={paquete.PaqueteID}
          >
            <header className="flex justify-between">
              <h1 className="text-base font-semibold">{paquete.Nombre}</h1>
              <h2 className="font-extrabold">
                Q.{getFormatoNumerico(paquete.PrecioVenta)}
              </h2>
            </header>
            <figure className="mb-2 text-sm italic">
              contiene {paquete.UnidadesTotales}{" "}
              {paquete.paquetes ? ` de ${paquete.paquetes.Nombre}` : "unidades"}
            </figure>
            <p>{paquete.Descripcion || "No hay descripción"}</p>
            <Pie bien={paquete} producto={producto} />
          </article>
        ))}
        <button onClick={() => console.log(detalles)}>Mostrar</button>
      </section>
    </>
  );
};
export default DetallesProducto;
