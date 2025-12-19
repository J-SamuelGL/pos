import { createFileRoute } from "@tanstack/react-router";
import CrearPaquete from "../../../pages/inventario/paquetes/pages/CrearPaquete";

export const Route = createFileRoute("/inventario/_inv/paquetes/crear")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CrearPaquete />;
}
