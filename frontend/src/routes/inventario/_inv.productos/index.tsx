import { createFileRoute } from "@tanstack/react-router";
import InventarioProductos from "../../../pages/inventario/productos/Productos";

export const Route = createFileRoute("/inventario/_inv/productos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InventarioProductos />;
}
