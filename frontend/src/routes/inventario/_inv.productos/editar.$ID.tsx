import { createFileRoute } from "@tanstack/react-router";
import InventarioProductoEditar from "../../../pages/inventario/productos/ProductoEditar";

export const Route = createFileRoute("/inventario/_inv/productos/editar/$ID")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InventarioProductoEditar />;
}
