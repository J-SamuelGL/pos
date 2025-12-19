import {
  useFormularioActualizarProducto,
  type propiedadesProducto,
} from "../../../hooks/hookProductoFormulario";

type props = {
  form: ReturnType<typeof useFormularioActualizarProducto>["formulario"];
  name: propiedadesProducto;
  tipo: React.HTMLInputTypeAttribute;
};
const InputForm = ({ form, name, tipo }: props) => {
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
              type={tipo}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </fieldset>
        </>
      )}
    />
  );
};
export default InputForm;
