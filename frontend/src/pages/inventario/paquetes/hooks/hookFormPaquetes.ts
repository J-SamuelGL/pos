import { useForm, formOptions } from "@tanstack/react-form";
import {
  type TPaqueteFormularioCrear,
  type TPaqueteFormularioEditar,
  SCrearPaquete,
  SEditarPaquete,
} from "../api/paquetes.schema";
import { usePaqueteCrear, usePaqueteActualizar } from "./hookPaquetes";
import type { id } from "../../../../utils/globales";

const paqueteDefault: TPaqueteFormularioCrear = {
  ProductoID: null,
  Nombre: "",
  UnidadesTotales: 1,
  PrecioVenta: 1,
  Descripcion: null,
  MedidaBase: null,
  ProveedorID: null,
  PrecioCompra: 1,
  Notas: null,
};

export type propiedadesPaquete = keyof typeof paqueteDefault;
export type propiedadesPaqueteEditar = keyof Omit<
  TPaqueteFormularioCrear,
  "ProductoID"
>;

const valoresIniciales = formOptions({
  defaultValues: paqueteDefault,
});

export const useFormCrearPaquete = () => {
  const mutation = usePaqueteCrear();
  const form = useForm({
    ...valoresIniciales,
    validators: {
      onChange: SCrearPaquete,
    },
    onSubmit: ({ value }) => {
      const valorCurado = {
        ...value,
        ProductoID: value.ProductoID.value,
        MedidaBase: value.MedidaBase?.value || null,
        ProveedorID: value.ProveedorID.value,
      };
      mutation.mutate(valorCurado);
    },
  });
  return { form, mutation };
};

export const useFormActualizarPaquete = (
  id: id,
  paqueteDefault: TPaqueteFormularioEditar | undefined,
) => {
  const mutation = usePaqueteActualizar();
  const form = useForm({
    defaultValues: paqueteDefault || {
      Nombre: "",
      UnidadesTotales: 0,
      PrecioVenta: 0,
      Descripcion: null,
      MedidaBase: null,
      ProveedorID: null,
      PrecioCompra: 0,
      Notas: null,
    },
    validators: {
      onChange: SEditarPaquete,
    },
    onSubmit: ({ value }) => {
      const valorCurado = {
        ...value,
        PaqueteID: id,
        MedidaBase: value.MedidaBase?.value || null,
        ProveedorID: value.ProveedorID.value,
      };
      mutation.mutate(valorCurado);
    },
  });
  return { form, mutation };
};
