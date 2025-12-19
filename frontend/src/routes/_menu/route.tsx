import { createFileRoute, redirect } from "@tanstack/react-router";
import Menu from "../../pages/menu/Menu";
import { mostrarIdentificacion } from "../../pages/login/apiIdentificacion";
import NoAutorizado from "../../components/NoAutorizado";
import { ROLES } from "../../utils/globales";
import { useIdentificacion } from "../../pages/login/hookIdentificacion";
import { verificarPermisos } from "../../pages/login/hookIdentificacion";

export const Route = createFileRoute("/_menu")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const cachedData = queryClient.getQueryData(["identificacion"]);

      if (cachedData) {
        return;
      }

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
      !verificarPermisos([ROLES.SUPER, ROLES.GERE], data?.objeto?.roles.Nombre)
    ) {
      return <NoAutorizado />;
    } else {
      return <Menu />;
    }
  },
});
