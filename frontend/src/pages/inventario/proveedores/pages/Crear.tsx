import InputForm from "../components/form/crear/InputForm";
import { useFormularioCrear } from "../hooks/form/hookForm";
import InputTextAreaForm from "../components/form/crear/InputTextAreaForm";
import BotonEnviar from "../components/form/crear/BotonEnviar";

const Crear = () => {
  const { formulario, mutation } = useFormularioCrear();

  return (
    <main className="contenido-inventario">
      <h1>Crear proveedor</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formulario.handleSubmit();
        }}
      >
        <InputForm form={formulario} name={"Nombre"} tipo="text" />
        <InputForm form={formulario} name={"Celular"} tipo="text" />
        <InputTextAreaForm form={formulario} name="Notas" />
        <BotonEnviar
          form={formulario}
          isPending={mutation.isPending}
          tipo="Crear"
          clase="w-full"
        />
      </form>
    </main>
  );
};
export default Crear;
