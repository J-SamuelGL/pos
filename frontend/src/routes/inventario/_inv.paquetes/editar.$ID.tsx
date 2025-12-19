import { createFileRoute } from "@tanstack/react-router";
import EditarPaquete from "../../../pages/inventario/paquetes/pages/EditarPaquete";

export const Route = createFileRoute("/inventario/_inv/paquetes/editar/$ID")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditarPaquete />;
}
