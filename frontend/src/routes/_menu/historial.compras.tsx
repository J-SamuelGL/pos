import { createFileRoute } from "@tanstack/react-router";
import HistorialCompras from "../../pages/historial-compras/HistorialCompras";

export const Route = createFileRoute("/_menu/historial/compras")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HistorialCompras />;
}
