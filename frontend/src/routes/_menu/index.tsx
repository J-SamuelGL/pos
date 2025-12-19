import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../../pages/menu/dashboard/Dashboard";

export const Route = createFileRoute("/_menu/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
