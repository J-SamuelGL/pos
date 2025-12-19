import { createFileRoute } from "@tanstack/react-router";
import HistorialVentas from "../../pages/historial-ventas/HistorialVentas";

export const Route = createFileRoute("/_menu/historial/ventas")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HistorialVentas />;
}
