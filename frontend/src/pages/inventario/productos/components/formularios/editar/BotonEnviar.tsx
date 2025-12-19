import { useFormularioActualizarProducto } from "../../../hooks/hookProductoFormulario";

type props = {
  form: ReturnType<typeof useFormularioActualizarProducto>;
  tipo: "Crear" | "Editar";
};

const BotonEnviar = ({ form, tipo }: props) => {
  return (
    <form.Subscribe
      selector={(state) => state.isFormValid && !state.isPristine}
    >
      {(canSubmit) => (
        <button
          type="submit"
          disabled={!canSubmit}
          className="botonNeutral duration-100 ease-in"
        >
          {tipo}
        </button>
      )}
    </form.Subscribe>
  );
};
export default BotonEnviar;
