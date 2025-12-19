import { create } from "zustand";
import type { TCompra, TDetalleCompra } from "../api/compra.schema";
import type { TRespuestaPaquete } from "../../paquetes/api/apiPaquetes";

export type TDetalleCompraStore = TDetalleCompra & {
  // se agregan para mostrar mas informacion en el componente nota
  Nombre: string;
  Proveedor: string;
  MedidaBase: string | undefined;
};

export type TCompraStore = Omit<
  TCompra,
  // esto se agrega al realizar la compra
  "EmpleadoID" | "FechaHora" | "DetallesCompra"
> & { DetallesCompra: TDetalleCompraStore[] };

type Acciones = {
  agregarPaquete: (paquete: TDetalleCompraStore) => void;
  actualizarCantidadPaquete: (
    viejoPaquete: TDetalleCompraStore,
    nuevaCantidad: number,
  ) => void;
  eliminarPaquete: (paqueteEliminar: TDetalleCompraStore) => void;
  limpiar: () => void;
};

export const useCompra = create<TCompraStore & Acciones>((set) => ({
  Total: 0,
  DetallesCompra: [],
  agregarPaquete: (nuevoPaquete) =>
    set((compra) => ({
      DetallesCompra: [...compra.DetallesCompra, nuevoPaquete],
      Total: compra.Total + nuevoPaquete.Subtotal,
    })),
  actualizarCantidadPaquete: (viejoPaquete, nuevaCantidad) =>
    set((compra) => ({
      DetallesCompra: compra.DetallesCompra.map((paquete) =>
        paquete.PaqueteID == viejoPaquete.PaqueteID
          ? {
              ...viejoPaquete,
              Cantidad: nuevaCantidad,
              Subtotal: nuevaCantidad * viejoPaquete.PrecioCompra,
            }
          : { ...paquete },
      ),
      Total:
        compra.Total -
        viejoPaquete.Subtotal +
        nuevaCantidad * viejoPaquete.PrecioCompra,
    })),
  eliminarPaquete: (paqueteEliminar) =>
    set((compra) => ({
      DetallesCompra: compra.DetallesCompra.filter(
        (paquete) => paquete.PaqueteID != paqueteEliminar.PaqueteID,
      ),
      Total: compra.Total - paqueteEliminar.Subtotal,
    })),
  limpiar: () => set({ Total: 0, DetallesCompra: [] }),
}));

export const buscarPaquete = (paquete: TRespuestaPaquete | undefined) => {
  const detalles = useCompra((estado) => estado.DetallesCompra);
  return detalles.find(
    (paqueteEnCarrito) =>
      paqueteEnCarrito.PaqueteID == paquete?.ProveedorPaqueteID,
  );
};
