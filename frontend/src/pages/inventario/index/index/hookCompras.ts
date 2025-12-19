import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { crearCompra, verCompras, buscarDetalles } from "../api/apiCompras";
import { type TCompra } from "../api/compra.schema";
import { type id } from "../../../../utils/globales";

export const useComprasCrear = () => {
  const queriClient = useQueryClient();
  return useMutation({
    mutationFn: (compra: TCompra) => crearCompra(compra),
    onSuccess: (data) => {
      alert(data?.mensaje);
      queriClient.invalidateQueries({
        queryKey: ["compras", "productos"],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useCompras = () => {
  return useQuery({
    queryKey: ["compras"],
    queryFn: () => verCompras(),
  });
};

export const useDetallesComprasBuscar = (id: id) => {
  return useQuery({
    queryKey: ["compras", id],
    queryFn: () => buscarDetalles(id),
    enabled: id !== null,
  });
};
