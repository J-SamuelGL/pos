import { createFileRoute } from "@tanstack/react-router";
import EmpleadoInfo from "../../../pages/empleados/pages/EmpleadoInfo";

export const Route = createFileRoute("/_menu/empleados/$ID")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmpleadoInfo />;
}
