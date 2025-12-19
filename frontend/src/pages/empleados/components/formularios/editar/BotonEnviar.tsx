import IconoCargando from "../../../../../../public/svg/IconoCargando";
import type { useFormularioActualizarEmpleado } from "../../../hooks/formularios/hookEmpleadoEditar";

type props = {
  form: ReturnType<typeof useFormularioActualizarEmpleado>["formulario"];
  tipo: "Crear" | "Editar";
  isPending: boolean;
};

const BotonEnviar = ({ form, tipo, isPending }: props) => {
  return (
    <form.Subscribe
      selector={(state) => state.isFormValid && !state.isPristine}
    >
      {(canSubmit) => (
        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className="botonNeutral w-full duration-100 ease-in"
        >
          {isPending ? (
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
