import { formOptions, useForm } from "@tanstack/react-form";
import {
  type TFormularioProducto,
  SFormularioProducto,
} from "../api/productos.schema";
import { useProductoActualizar, useProductoCrear } from "./hookProductos";

const productoDefault: TFormularioProducto = {
  Nombre: "",
  Descripcion: null,
  PrecioVenta: 1,
};

export type propiedadesProducto = keyof TFormularioProducto;

const valoresIniciales = formOptions({
  defaultValues: productoDefault,
});

export const useFormularioActualizarProducto = (
  id: string | undefined,
  productoInicial: TFormularioProducto,
) => {
  const mutation = useProductoActualizar();
  const formulario = useForm({
    defaultValues: productoInicial || {
      Nombre: "",
      Descripcion: null,
      PrecioVenta: 1,
    },
    validators: {
      onChange: SFormularioProducto as any,
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ ...value, ID: id });
    },
  });
  return { formulario, mutation };
};

export const useFormularioCrearProducto = () => {
  const mutation = useProductoCrear();
  const formulario = useForm({
    ...valoresIniciales,
    validators: {
      onChange: SFormularioProducto as any,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  return { formulario, mutation };
};
