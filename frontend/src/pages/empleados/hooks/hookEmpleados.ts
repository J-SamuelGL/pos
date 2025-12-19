import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mostrarEmpleados,
  buscarEmpleado,
  actualizarEmpleado,
  crearEmpleado,
  verRoles,
} from "../api/apiEmpleados";
import type {
  actualizarEmpleadoSolicitud,
  crearEmpleadoSolicitud,
} from "../api/empleados.tipos";
import { useNavigate } from "@tanstack/react-router";

export const useEmpleados = () => {
  return useQuery({
    queryKey: ["empleados"],
    queryFn: () => mostrarEmpleados(),
  });
};

export const useEmpleadosDetalles = (id: string) => {
  return useQuery({
    queryKey: ["empleados", id],
    queryFn: () => buscarEmpleado(id),
  });
};

export const useEmpleadosDetallesForm = (id: string) => {
  return useQuery({
    queryKey: ["empleados", id],
    queryFn: () => buscarEmpleado(id),
    select: (data) => {
      const formatDateForInput = (date: Date | null | undefined) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split("T")[0];
      };

      return {
        RolID: {
          value: data?.objeto?.RolID,
          label: `${data?.objeto.roles.Nombre} ${data?.objeto.roles.Descripcion}`,
        },
        Nombres: data?.objeto?.Nombres,
        Apellidos: data?.objeto?.Apellidos,
        Usuario: data?.objeto?.Usuario,
        Salario: Number(data?.objeto.Salario),
        Celular: data?.objeto.Celular
          ? data.objeto.Celular.replace(/(\d{4})(\d{4})/, "$1-$2")
          : null,
        FechaNacimiento: formatDateForInput(data?.objeto.FechaNacimiento),
        FechaFinLabores: formatDateForInput(data?.objeto.FechaFinLabores),
      };
    },
  });
};

export const useEmpleadosActualizar = () => {
  const queryClient = useQueryClient();
  const navegar = useNavigate();
  return useMutation({
    mutationFn: (actualizarEmpleadoSolicitud: actualizarEmpleadoSolicitud) =>
      actualizarEmpleado(actualizarEmpleadoSolicitud),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["empleados"],
      });
      alert(data.mensaje);
      navegar({ to: "/empleados" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useEmpleadosCrear = () => {
  const navegar = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (crearEmpleadoSolicitud: crearEmpleadoSolicitud) =>
      crearEmpleado(crearEmpleadoSolicitud),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["empleados"],
      });
      alert(data.mensaje);
      navegar({ to: "/empleados" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => verRoles(),
    select: (data) => {
      return data?.objeto?.map((rol) => ({
        value: rol.RolID,
        label: `${rol.Nombre}: ${rol.Descripcion}`,
      }));
    },
  });
};
