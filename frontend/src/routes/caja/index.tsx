import { createFileRoute, redirect } from "@tanstack/react-router";
import Caja from "../../pages/caja/pages/Caja";
import NoAutorizado from "../../components/NoAutorizado";
import { ROLES } from "../../utils/globales";
import {
  useIdentificacion,
  verificarPermisos,
} from "../../pages/login/hookIdentificacion";
import { mostrarIdentificacion } from "../../pages/login/apiIdentificacion";

export const Route = createFileRoute("/caja/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      // Try to get cached data first
      const cachedData = queryClient.getQueryData(["identificacion"]);

      if (cachedData) {
        return;
      }

      // If no cache, fetch fresh
      const data = await queryClient.fetchQuery({
        queryKey: ["identificacion"],
        queryFn: () => mostrarIdentificacion(),
      });

      if (!data?.objeto) {
        throw redirect({ to: "/login" });
      }
    } catch (error) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => {
    const { data } = useIdentificacion();
    // @ts-ignore
    if (
      !verificarPermisos(
        [ROLES.SUPER, ROLES.GERE, ROLES.CAJA],
        data?.objeto?.roles.Nombre,
      )
    ) {
      return <NoAutorizado />;
    } else {
      return <Caja />;
    }
  },
});
