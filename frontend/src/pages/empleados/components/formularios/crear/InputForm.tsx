import {
  useFormularioCrearEmpleado,
  type propiedadesEmpleado,
} from "../../../hooks/formularios/hookEmpleadoCrear";

type props = {
  form: ReturnType<typeof useFormularioCrearEmpleado>["formulario"];
  name: propiedadesEmpleado;
  tipo: React.HTMLInputTypeAttribute;
  titulo?: string;
};

const InputForm = ({ form, name, tipo, titulo }: props) => {
  return (
    <form.Field
      name={name}
      children={(field) => {
        // Convert Date to string for date inputs
        const displayValue =
          tipo === "date" && field.state.value instanceof Date
            ? field.state.value.toISOString().split("T")[0]
            : field.state.value;

        return (
          <>
            <label>{titulo || name}</label>
            <fieldset className="flex flex-col">
              {!field.state.meta.isValid && (
                <em className="bg-red-200">
                  {field.state.meta.errors.map((error) => error?.message)}
                </em>
              )}
              <input
                className="inputForm"
                onBlur={field.handleBlur}
                type={tipo}
                value={displayValue}
                onChange={(e) => {
                  // Convert string to Date for date inputs
                  const value =
                    tipo === "date" ? new Date(e.target.value) : e.target.value;
                  field.handleChange(value);
                }}
              />
            </fieldset>
          </>
        );
      }}
    />
  );
};

export default InputForm;
