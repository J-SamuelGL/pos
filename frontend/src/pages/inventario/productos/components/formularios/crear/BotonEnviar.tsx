import { useFormularioCrearProducto } from "../../../hooks/hookProductoFormulario";
import IconoCargando from "../../../../../../../public/svg/IconoCargando";

type props = {
  form: ReturnType<typeof useFormularioCrearProducto>["formulario"];
  tipo: "Crear" | "Editar";
  isPendingActualizar?: boolean;
  isPendingCrear?: boolean;
};

const BotonEnviar = ({
  form,
  tipo,
  isPendingActualizar,
  isPendingCrear,
}: props) => {
  return (
    <form.Subscribe
      selector={(state) => state.isFormValid && !state.isPristine}
    >
      {(canSubmit) => (
        <button
          type="submit"
          disabled={!canSubmit || isPendingActualizar || isPendingCrear}
          className="botonNeutral duration-100 ease-in"
        >
          {isPendingActualizar || isPendingCrear ? (
            <span className="flex justify-center">
              <IconoCargando boton={true} />
            </span>
          ) : (
            tipo
          )}
        </button>
      )}
    </form.Subscribe>
  );
};
export default BotonEnviar;
