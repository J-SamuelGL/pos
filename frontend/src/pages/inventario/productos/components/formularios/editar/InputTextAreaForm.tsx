import {
  useFormularioActualizarProducto,
  type propiedadesProducto,
} from "../../../hooks/hookProductoFormulario";

type props = {
  form: ReturnType<typeof useFormularioActualizarProducto>["formulario"];
  name: propiedadesProducto;
};
const InputTextAreaForm = ({ form, name }: props) => {
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
            <textarea
              className="inputForm"
              onBlur={field.handleBlur}
              value={field.state.value || undefined}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </fieldset>
        </>
      )}
    />
  );
};
export default InputTextAreaForm;
