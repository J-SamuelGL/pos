import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mostrarIdentificacion } from "./apiIdentificacion.js";
import { ROLES } from "../../utils/globales.js";
import { logeo, anularTokens } from "./apiAutentificacion.js";
import type { logeoSolicitud } from "./tiposAutentificacion.js";
import { useRouter } from "@tanstack/react-router";

export const verificarPermisos = (
  rolesRequeridos: (typeof ROLES)[],
  rolUsuario: typeof ROLES,
) => {
  if (rolesRequeridos.includes(rolUsuario)) {
    return true;
  }
  return false;
};

export const useIdentificacion = () => {
  return useQuery({
    queryFn: () => mostrarIdentificacion(),
    queryKey: ["identificacion"],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useIdentificacionLogeo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credenciales: logeoSolicitud) => logeo(credenciales),
    onError: (error) => {
      alert(error.message ? error.message : error);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["identificacion"],
      });

      await queryClient.refetchQueries({
        queryKey: ["identificacion"],
      });

      await router.invalidate();

      const rol = data?.objeto?.roles.Nombre;

      switch (rol) {
        case ROLES.SUPER:
        case ROLES.GERE:
          await router.navigate({ to: "/" });
          break;
        case ROLES.CAJA:
          await router.navigate({ to: "/caja" });
          break;
        case ROLES.BODE:
          await router.navigate({ to: "/inventario" });
          break;
      }
    },
  });
};

export const useIdentificacionCerrarSesion = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => anularTokens(),
    onSettled: async () => {
      queryClient.removeQueries({
        queryKey: ["identificacion"],
      });
      queryClient.clear();
      await router.navigate({ to: "/login" });
      await router.invalidate();
    },
  });
};
