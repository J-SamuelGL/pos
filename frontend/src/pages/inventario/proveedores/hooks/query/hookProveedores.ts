import { useNavigate } from "@tanstack/react-router";
import {
  verProveedores,
  actualizarProveedor,
  buscarProveedor,
  crearProveedores,
} from "../../api/apiProveedores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type TFormularioProveedor } from "../../api/proveedores.schema";
import { type id } from "../../../../../utils/globales";

export const useProveedores = () => {
  return useQuery({
    queryKey: ["proveedores"],
    queryFn: () => verProveedores(),
  });
};

export const useProveedorBuscar = (ID: id) => {
  return useQuery({
    queryKey: ["proveedor", ID],
    queryFn: () => buscarProveedor(ID),
    enabled: ID !== null,
  });
};

export const useProveedorActualizar = () => {
  const queryClient = useQueryClient();
  const navegar = useNavigate({ from: "/inventario" });
  return useMutation({
    mutationFn: (proveedor: TFormularioProveedor & { ID: id }) =>
      actualizarProveedor(proveedor),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["proveedores"],
      });
      alert(data?.mensaje);
      navegar({ to: "proveedores" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useProveedorCrear = () => {
  const navegar = useNavigate({ from: "/inventario" });
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (proveedor: TFormularioProveedor) =>
      crearProveedores(proveedor),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["proveedores"],
      });
      alert(data?.mensaje);
      navegar({ to: "proveedores" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
