import { createFileRoute } from "@tanstack/react-router";
import ProductoCrear from "../../../pages/inventario/productos/ProductoCrear";

export const Route = createFileRoute("/inventario/_inv/productos/crear")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductoCrear />;
}
