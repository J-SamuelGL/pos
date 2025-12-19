import { createFileRoute } from "@tanstack/react-router";
import Index from "../../../pages/inventario/proveedores/pages/Index";

export const Route = createFileRoute("/inventario/_inv/proveedores/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Index />;
}
