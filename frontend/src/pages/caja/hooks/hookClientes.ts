import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mostrarClientes, crearClientes } from "../api/clientes/apiClientes";
import { type TCliente } from "../api/clientes/clientes.schema";

export const useClientes = () => {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: () => mostrarClientes(),
  });
};

export const useClienteCrear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cliente: TCliente) => crearClientes(cliente),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["clientes"],
      });
      alert(data?.mensaje);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
