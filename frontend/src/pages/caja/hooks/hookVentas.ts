import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { crearVenta, verVentas, buscarDetalles } from "../api/ventas/apiVentas";
import { type TVenta } from "../api/ventas/venta.schema";
import { type id } from "../../../utils/globales";

export const useVentasCrear = () => {
  const queriClient = useQueryClient();
  return useMutation({
    mutationFn: (venta: TVenta) => crearVenta(venta),
    onSuccess: (data) => {
      alert(data?.mensaje);
      queriClient.invalidateQueries({
        queryKey: ["productos"],
      });
      queriClient.invalidateQueries({
        queryKey: ["ventas"],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: () => verVentas(),
  });
};

export const useDetallesVentasBuscar = (id: id) => {
  return useQuery({
    queryKey: ["ventas", id],
    queryFn: () => buscarDetalles(id),
    enabled: id !== null,
  });
};
