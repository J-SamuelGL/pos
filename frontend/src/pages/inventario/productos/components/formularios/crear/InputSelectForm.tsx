import Select from "react-select";
import {
  useFormularioCrearProducto,
  type propiedadesProducto,
} from "../../../hooks/hookProductoFormulario";

type props = {
  form: ReturnType<typeof useFormularioCrearProducto>;
  name: propiedadesProducto;
  label: string;
  options: any;
  placeholder: string;
  notFound: string;
};

const InputSelectForm = ({
  form,
  name,
  label,
  options,
  placeholder,
  notFound,
}: props) => {
  return (
    <form.Field
      name={name}
      children={(field) => (
        <>
          <label>{label}</label>
          <fieldset>
            {!field.state.meta.isValid && (
              <em className="bg-red-200">
                {field.state.meta.errors.map((error) => error?.message)}
              </em>
            )}
            <Select
              isClearable={true}
              options={options}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              placeholder={placeholder}
              noOptionsMessage={() => notFound}
              onChange={(value) => field.handleChange(value)}
            />
          </fieldset>
        </>
      )}
    />
  );
};
export default InputSelectForm;
