import { createFileRoute } from "@tanstack/react-router";
import Crear from "../../../pages/inventario/proveedores/pages/Crear";

export const Route = createFileRoute("/inventario/_inv/proveedores/crear")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Crear />;
}
