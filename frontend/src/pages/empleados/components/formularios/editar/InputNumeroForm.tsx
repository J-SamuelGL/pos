import {
  useFormularioActualizarEmpleado,
  type propiedadesEmpleado,
} from "../../../hooks/formularios/hookEmpleadoEditar";

type props = {
  form: ReturnType<typeof useFormularioActualizarEmpleado>["formulario"];
  name: propiedadesEmpleado;
};

const InputNumeroForm = ({ form, name }: props) => {
  return (
    <form.Field
      name={name}
      children={(field) => (
        <>
          <label>{name}</label>
          <fieldset className="flex flex-col">
            {!field.state.meta.isValid && (
              <em className="bg-red-200">
                {field.state.meta.errors.map((error) => error?.message)}
              </em>
            )}
            <input
              className="inputForm"
              onBlur={field.handleBlur}
              type="number"
              value={Number(field.state.value)}
              onFocus={(e) => e.target.select()}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </fieldset>
        </>
      )}
    />
  );
};
export default InputNumeroForm;
