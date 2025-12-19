import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  actualizarPaquete,
  buscarPaquete,
  crearPaquetes,
  verPaquetes,
  type actualizarPaqueteSolicitud,
} from "../api/apiPaquetes";
import { useNavigate } from "@tanstack/react-router";
import type { TPaqueteFormularioCrear } from "../api/paquetes.schema";
import type { id } from "../../../../utils/globales";

export const usePaquetes = () => {
  return useQuery({
    queryFn: () => verPaquetes(),
    queryKey: ["paquetes"],
  });
};

export const usePaquetesRecursivo = () => {
  return useQuery({
    queryFn: () => verPaquetes(),
    queryKey: ["paquetes"],
    select: (data) => {
      return data?.objeto.map((paquete) => ({
        label: paquete.paquetes.Nombre,
        value: paquete.PaqueteID,
      }));
    },
  });
};

export const usePaqueteBuscar = (ID: id) => {
  return useQuery({
    queryFn: () => buscarPaquete(ID),
    queryKey: ["paquete", ID],
    enabled: ID !== null,
  });
};

export const usePaqueteActualizar = () => {
  const queryClient = useQueryClient();
  const navegar = useNavigate();
  return useMutation({
    mutationFn: (paquete: actualizarPaqueteSolicitud) =>
      actualizarPaquete(paquete),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["paquetes"],
      });
      alert(data.mensaje);
      navegar({ to: "/inventario/productos" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const usePaqueteCrear = () => {
  const queryClient = useQueryClient();
  const navegar = useNavigate();
  return useMutation({
    mutationFn: (paquete: TPaqueteFormularioCrear) => crearPaquetes(paquete),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["paquetes"],
      });
      alert(data.mensaje);
      navegar({ to: "/inventario/productos" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
