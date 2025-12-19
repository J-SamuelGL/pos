import { createFileRoute } from "@tanstack/react-router";
import EmpleadoCrear from "../../../pages/empleados/pages/EmpleadoCrear";

export const Route = createFileRoute("/_menu/empleados/crear")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmpleadoCrear />;
}
