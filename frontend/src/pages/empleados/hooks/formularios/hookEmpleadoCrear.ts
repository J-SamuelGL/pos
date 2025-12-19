import { formOptions, useForm } from "@tanstack/react-form";
import {
  type TFormularioCrearEmpleado,
  SFormularioCrearEmpleado,
} from "../../api/empleados.schema";
import { useEmpleadosCrear } from "../hookEmpleados";

const empleadoDefault: TFormularioCrearEmpleado = {
  RolID: undefined,
  Nombres: "",
  Apellidos: "",
  Usuario: "",
  Clave: "",
  FechaContratado: new Date(),
  Genero: "Hombre",
  Salario: 0,
  Celular: "",
  FechaNacimiento: undefined,
};

export type propiedadesEmpleado = keyof TFormularioCrearEmpleado;

const valoresIniciales = formOptions({
  defaultValues: empleadoDefault,
});

export const useFormularioCrearEmpleado = () => {
  const mutation = useEmpleadosCrear();
  const formulario = useForm({
    ...valoresIniciales,
    validators: {
      onBlur: SFormularioCrearEmpleado as any,
    },
    onSubmit: ({ value }) => {
      const valorCurado = {
        ...value,
        RolID: value.RolID.value,
        Genero: value.Genero.value,
      };
      mutation.mutate({ ...valorCurado });
    },
  });
  return { formulario, mutation };
};
