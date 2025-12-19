import { create } from "zustand";
import type { TVenta, TDetalleVenta } from "./venta.schema";

// obtener cantidad que esta en carrito
// -> busqueda
// calcular cuantos de un producto lleva en carrito
// -> requiere conversion
// calcular si se puede comprar
// -> conversion

export type TDetalleVentaStore = TDetalleVenta & {
  // para mostrar informacion en la GUI
  NombrePaquete?: string | null | undefined;
  NombreProducto?: string | undefined | null;
  ProductoID: number;
  // a unidades
  UnidadesEquivalentes?: number;
};

export type TVentaStore = Omit<
  // se agregan despues
  TVenta,
  | "DetallesVenta"
  | "EmpleadoID"
  | "FechaHora"
  | "NIT"
  | "MontoRecibido"
  | "Vuelto"
> & {
  DetallesVenta: TDetalleVentaStore[];
};

type Acciones = {
  agregarBien: (bien: TDetalleVentaStore) => void;
  actualizarCantidadBien: (
    viejoBien: TDetalleVentaStore,
    nuevaCantidad: number,
    EquivalenteActualizado?: number,
  ) => void;
  eliminarBien: (bienEliminar: TDetalleVentaStore) => void;
  limpiar: () => void;
};

// definicion de acciones
const actualizar = (
  viejoBien: TDetalleVentaStore,
  nuevaCantidad: number,
  venta: TVentaStore,
  EquivalenteActualizado?: number,
) => {
  if (viejoBien.NombrePaquete) {
    return {
      DetallesVenta: venta.DetallesVenta.map((paquete) =>
        paquete.NombrePaquete == viejoBien.NombrePaquete
          ? {
              ...viejoBien,
              Cantidad: nuevaCantidad,
              Subtotal: nuevaCantidad * viejoBien.PrecioVenta,
              UnidadesEquivalentes: EquivalenteActualizado,
            }
          : { ...paquete },
      ),
      Total:
        venta.Total -
        viejoBien.Subtotal +
        nuevaCantidad * viejoBien.PrecioVenta,
    };
  } else {
    return {
      DetallesVenta: venta.DetallesVenta.map((producto) =>
        producto.NombreProducto == viejoBien.NombreProducto
          ? {
              ...viejoBien,
              Cantidad: nuevaCantidad,
              Subtotal: nuevaCantidad * viejoBien.PrecioVenta,
            }
          : { ...producto },
      ),
      Total:
        venta.Total -
        viejoBien.Subtotal +
        nuevaCantidad * viejoBien.PrecioVenta,
    };
  }
};

const eliminar = (venta: TVentaStore, bienEliminar: TDetalleVentaStore) => {
  if (bienEliminar.NombrePaquete) {
    return {
      Total: venta.Total - bienEliminar.Subtotal,
      DetallesVenta: venta.DetallesVenta.filter(
        (paquete) => paquete.NombrePaquete != bienEliminar.NombrePaquete,
      ),
    };
  } else {
    return {
      Total: venta.Total - bienEliminar.Subtotal,
      DetallesVenta: venta.DetallesVenta.filter(
        (producto) => producto.NombreProducto != bienEliminar.NombreProducto,
      ),
    };
  }
};

// store
export const useVenta = create<TVentaStore & Acciones>((set) => ({
  Total: 0,
  DetallesVenta: [],
  agregarBien: (nuevoBien) =>
    set((venta) => ({
      DetallesVenta: [...venta.DetallesVenta, nuevoBien],
      Total: venta.Total + nuevoBien.Subtotal,
    })),
  actualizarCantidadBien: (viejoBien, nuevaCantidad, EquivalenteActualizado) =>
    set((venta) =>
      actualizar(viejoBien, nuevaCantidad, venta, EquivalenteActualizado),
    ),
  eliminarBien: (bienEliminar) => set((venta) => eliminar(venta, bienEliminar)),
  limpiar: () => set({ Total: 0, DetallesVenta: [] }),
}));
