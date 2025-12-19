import { formOptions, useForm } from "@tanstack/react-form";
import {
  type TFormularioProveedor,
  SProveedor,
} from "../../api/proveedores.schema";
import {
  useProveedorCrear,
  useProveedorActualizar,
} from "../query/hookProveedores";
import { type id } from "../../../../../utils/globales";

export type propiedadesProveedor = keyof TFormularioProveedor;

const proveedorDefault: TFormularioProveedor = {
  Nombre: "",
  Celular: "",
  Notas: undefined,
};

const valoresIniciales = formOptions({
  defaultValues: proveedorDefault,
});

export const useFormularioCrear = () => {
  const mutation = useProveedorCrear();
  const formulario = useForm({
    ...valoresIniciales,
    validators: {
      onBlur: SProveedor,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  return { formulario, mutation };
};

export const useFormularioActualizar = (
  valoresIniciales: TFormularioProveedor,
  ID: id,
) => {
  const mutation = useProveedorActualizar();
  const formulario = useForm({
    defaultValues: valoresIniciales || proveedorDefault,
    validators: {
      onBlur: SProveedor,
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ ...value, ID });
    },
  });
  return { formulario, mutation };
};
