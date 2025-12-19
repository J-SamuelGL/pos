import { createFileRoute } from "@tanstack/react-router";
import RegistrarCompra from "../../pages/inventario/index/index/RegistrarCompra";

export const Route = createFileRoute("/inventario/_inv/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegistrarCompra />;
}
