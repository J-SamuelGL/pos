import { useForm } from "@tanstack/react-form";
import {
  type TFormularioEditarEmpleado,
  SFormularioActualizarEmpleado,
} from "../../api/empleados.schema";
import { useEmpleadosActualizar } from "../hookEmpleados";

const empleadoDefault: TFormularioEditarEmpleado = {
  RolID: "",
  Nombres: "",
  Apellidos: "",
  Usuario: "",
  Salario: 0,
  Celular: "",
  FechaNacimiento: "" as any,
  FechaFinLabores: "" as any,
};

export type propiedadesEmpleado = keyof TFormularioEditarEmpleado;

export const useFormularioActualizarEmpleado = (
  valoresIniciales: TFormularioEditarEmpleado,
  id: string,
) => {
  const mutation = useEmpleadosActualizar();
  const formulario = useForm({
    defaultValues: valoresIniciales || empleadoDefault,
    validators: {
      onChange: SFormularioActualizarEmpleado as any,
    },
    onSubmit: ({ value }) => {
      const valorCurado = {
        ...value,
        RolID: value.RolID.value,
      };
      mutation.mutate({ ...valorCurado, id });
    },
  });
  return { formulario, mutation };
};
