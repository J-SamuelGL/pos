import { useNavigate } from "@tanstack/react-router";
import {
  verProductos,
  buscarProducto,
  actualizarProducto,
  crearProductos,
} from "../api/apiProductos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type TFormularioProducto } from "../api/productos.schema";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: () => verProductos(),
    select: (data) => {
      return data?.objeto?.map((producto) => ({
        value: producto.ProductoID,
        label: producto.Nombre,
      }));
    },
  });
};

export const useProductosFull = () => {
  return useQuery({
    queryKey: ["productos"],
    queryFn: () => verProductos(),
  });
};

export const useProductoBuscar = (id: number | null) => {
  return useQuery({
    queryKey: ["productos", id],
    queryFn: () => buscarProducto(id),
    enabled: id !== null,
  });
};

export const useProductoBuscarActualizar = (id: number | null) => {
  return useQuery({
    queryKey: ["productos", id],
    queryFn: () => buscarProducto(id),
    enabled: id !== null,
    select: (data) => {
      return {
        Nombre: data?.objeto?.Nombre,
        Descripcion: data?.objeto?.Descripcion,
        PrecioVenta: Number(data?.objeto?.PrecioVenta),
      };
    },
  });
};

export const useProductoActualizar = () => {
  const queryClient = useQueryClient();
  const navegar = useNavigate();
  return useMutation({
    mutationFn: (producto: TFormularioProducto & { ID: string | undefined }) =>
      actualizarProducto(producto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
      alert(data.mensaje);
      navegar({ to: "/inventario/productos" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export const useProductoCrear = () => {
  const navegar = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (producto: TFormularioProducto) => crearProductos(producto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["productos"],
      });
      alert(data.mensaje);
      navegar({ to: "/inventario/productos" });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
