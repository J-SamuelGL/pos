import { createFileRoute } from "@tanstack/react-router";
import Empleados from "../../../pages/empleados/pages/Empleados";

export const Route = createFileRoute("/_menu/empleados/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Empleados />;
}
