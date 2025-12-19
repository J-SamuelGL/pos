import { createFileRoute } from "@tanstack/react-router";
import Editar from "../../../pages/inventario/proveedores/pages/Editar";

export const Route = createFileRoute("/inventario/_inv/proveedores/editar/$ID")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <Editar />;
}
