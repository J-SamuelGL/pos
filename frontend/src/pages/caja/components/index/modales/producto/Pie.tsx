import { type TDetalleVentaStore } from "../../../../api/ventas/venta.store";
import { type bien, esPaquete, crearBien } from "./DetallesProducto";
import { useVenta } from "../../../../api/ventas/venta.store";
import IconoBorrar from "../../../../../../../public/svg/IconoBorrar";
import IconoAgregarCarrito from "../../../../../../../public/svg/IconoAgregarCarrito";
import InputCantidad from "./InputCantidad";
import { useState } from "react";
import type { TRespuestaProductoBuscar } from "../../../../../inventario/productos/api/productos.schema";

type props = {
  bien: bien;
  producto: TRespuestaProductoBuscar;
};

export const esEnCarrito = (detalles: TDetalleVentaStore[], bien: bien) => {
  // buscar si existe en DetallesVenta (carrito) segun el tipo de bien que sea
  let bienExistente = null;
  if (esPaquete(bien)) {
    bienExistente = detalles.find((item) => item.PaqueteID === bien.PaqueteID);
  } else {
    // es producto (unidad)
    bienExistente = detalles.find(
      (item) => item.ProductoID === bien.ProductoID && item.PaqueteID === null,
    );
  }
  return bienExistente;
};

export const puedeComprar = (
  bien: TDetalleVentaStore | undefined,
  detalles: TDetalleVentaStore[],
  cantidad: number,
  producto: TRespuestaProductoBuscar,
  bienOriginal: bien,
) => {
  let totalComprado = 0;
  detalles.forEach((detalle) => {
    if (detalle.PaqueteID) {
      // paquetes lo tiene
      totalComprado += detalle.UnidadesEquivalentes as any;
    } else {
      totalComprado += detalle.Cantidad;
    }
  });

  if (esPaquete(bienOriginal)) {
    return totalComprado + bienOriginal.UnidadesTotales <= producto.Cantidad;
  } else {
    return totalComprado + 1 <= producto.Cantidad;
  }
};

const Pie = ({ bien, producto }: props) => {
  const { DetallesVenta, eliminarBien, agregarBien } = useVenta(
    (estado) => estado,
  );
  // recuperando la cantidad inicial
  const bienEncontrado = esEnCarrito(DetallesVenta, bien);
  const [cantidad, setCantidad] = useState(
    String(bienEncontrado?.Cantidad) || "1",
  );

  return (
    <footer className="mb-2 flex items-center justify-end gap-2 px-2">
      {bienEncontrado ? (
        <>
          <InputCantidad
            entero={cantidad}
            setEntero={setCantidad}
            bien={bienEncontrado}
            cantidad={cantidad}
            seleccionarDefault={true}
            producto={producto}
            // es para sacar las unidades a las que equivale
            bienOriginal={bien}
          />
          <button
            className="hover:rouded-md p-1 hover:bg-slate-100"
            onClick={() => eliminarBien(bienEncontrado)}
          >
            <IconoBorrar />
          </button>
        </>
      ) : (
        <>
          <button
            className="p-1 hover:rounded-md hover:bg-slate-100 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            disabled={
              !puedeComprar(
                bienEncontrado,
                DetallesVenta,
                Number(cantidad),
                producto,
                bien,
              )
            }
            onClick={() => {
              setCantidad("1");
              agregarBien(crearBien(bien, 1));
            }}
          >
            <IconoAgregarCarrito />
          </button>
          {!puedeComprar(
            bienEncontrado,
            DetallesVenta,
            Number(cantidad),
            producto,
            bien,
          ) && <p className="text-red-300">Se acabaron las unidades</p>}
        </>
      )}
    </footer>
  );
};

export default Pie;
