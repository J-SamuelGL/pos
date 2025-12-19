import { createFileRoute } from "@tanstack/react-router";
import IniciarSesion from "../pages/login/IniciarSesion";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <IniciarSesion />;
}
