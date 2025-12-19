import IconoCargando from "../../../../../../../public/svg/IconoCargando";
import { useFormularioCrear } from "../../../hooks/form/hookForm";

type props = {
  form: ReturnType<typeof useFormularioCrear>["formulario"];
  tipo: "Crear" | "Editar";
  isPending: boolean;
  clase?: string;
};

const BotonEnviar = ({ form, tipo, isPending, clase }: props) => {
  return (
    <form.Subscribe
      selector={(state) => state.isFormValid && !state.isPristine}
    >
      {(canSubmit) => (
        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className={`botonNeutral duration-100 ease-in ${clase}`}
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
