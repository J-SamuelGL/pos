import { useForm } from "@tanstack/react-form";
import {
  SCliente,
  type TCliente,
} from "../../../../api/clientes/clientes.schema";
import { useClienteCrear } from "../../../../hooks/hookClientes";
import IconoCargando from "../../../../../../../public/svg/IconoCargando";

type props = {
  setCliente: React.Dispatch<
    React.SetStateAction<{ label: string; value: string } | null>
  >;
  setCrear: React.Dispatch<React.SetStateAction<boolean>>;
};

const valoresIniciales: TCliente = {
  NIT: "",
  Nombres: "",
  Apellidos: "",
};

const CrearCliente = ({ setCliente, setCrear }: props) => {
  const { isPending, mutate } = useClienteCrear();
  const form = useForm({
    validators: {
      onBlur: SCliente,
    },
    defaultValues: valoresIniciales,
  });
  return (
    <article className="tarjeta mb-4 p-4">
      <form.Field
        name="NIT"
        children={(field) => (
          <>
            <fieldset className="flex flex-col">
              <label>NIT</label>
              {!field.state.meta.isValid && (
                <em className="bg-red-200">
                  {field.state.meta.errors.map((error) => error?.message)}
                </em>
              )}
              <input
                className="inputForm"
                onBlur={field.handleBlur}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </fieldset>
          </>
        )}
      />
      <form.Field
        name="Nombres"
        children={(field) => (
          <>
            <label>Nombres</label>
            <fieldset className="flex flex-col">
              {!field.state.meta.isValid && (
                <em className="bg-red-200">
                  {field.state.meta.errors.map((error) => error?.message)}
                </em>
              )}
              <input
                className="inputForm"
                onBlur={field.handleBlur}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </fieldset>
          </>
        )}
      />
      <form.Field
        name="Apellidos"
        children={(field) => (
          <>
            <label>Apellidos</label>
            <fieldset className="flex flex-col">
              {!field.state.meta.isValid && (
                <em className="bg-red-200">
                  {field.state.meta.errors.map((error) => error?.message)}
                </em>
              )}
              <input
                className="inputForm"
                onBlur={field.handleBlur}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </fieldset>
          </>
        )}
      />
      <footer className="flex gap-4">
        <form.Subscribe
          selector={(state) => state.isFormValid && !state.isPristine}
        >
          {(canSubmit) => (
            <button
              disabled={!canSubmit || isPending}
              className="botonNeutral w-full duration-100 ease-in"
              onClick={() => {
                setCliente({
                  label:
                    form.state.values.Nombres +
                    " " +
                    form.state.values.Apellidos,
                  value: form.state.values.NIT,
                });
                mutate({
                  NIT: form.state.values.NIT,
                  Nombres: form.state.values.Nombres,
                  Apellidos: form.state.values.Apellidos,
                });
                setCrear(false);
              }}
            >
              {isPending ? (
                <span className="flex justify-center">
                  <IconoCargando boton={true} />
                </span>
              ) : (
                "Crear"
              )}
            </button>
          )}
        </form.Subscribe>
        <button
          className="w-full bg-slate-300 p-2 text-sm"
          onClick={() => setCrear(false)}
        >
          Cancelar
        </button>
      </footer>
    </article>
  );
};
export default CrearCliente;
