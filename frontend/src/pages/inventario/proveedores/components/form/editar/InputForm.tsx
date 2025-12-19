import {
  useFormularioActualizar,
  type propiedadesProveedor,
} from "../../../hooks/form/hookForm";

type props = {
  form: ReturnType<typeof useFormularioActualizar>["formulario"];
  name: Exclude<propiedadesProveedor, "Notas">;
  tipo: React.HTMLInputTypeAttribute;
  titulo?: string;
};

const InputForm = ({ form, name, tipo, titulo }: props) => {
  return (
    <form.Field
      name={name}
      children={(field) => {
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
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
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
