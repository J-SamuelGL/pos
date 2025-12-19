import { createFileRoute } from "@tanstack/react-router";
import EmpleadoEditar from "../../../pages/empleados/pages/EmpleadoEditar";

export const Route = createFileRoute("/_menu/empleados/editar/$ID")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmpleadoEditar />;
}
