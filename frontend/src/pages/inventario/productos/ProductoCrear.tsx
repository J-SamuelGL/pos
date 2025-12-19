import { useFormularioCrearProducto } from "./hooks/hookProductoFormulario";
import InputForm from "./components/formularios/crear/InputForm";
import InputTextAreaForm from "./components/formularios/crear/InputTextAreaForm";
import InputNumeroForm from "./components/formularios/crear/InputNumeroForm";
import BotonEnviar from "./components/formularios/crear/BotonEnviar";

const ProductoCrear = () => {
  const { formulario: form, mutation } = useFormularioCrearProducto();
  return (
    <main className="contenido-inventario">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h1>Crear producto</h1>
        <hr />
        <InputForm form={form} name="Nombre" tipo="text" />
        <InputTextAreaForm form={form} name="Descripcion" />
        <InputNumeroForm form={form} name="PrecioVenta" />
        <BotonEnviar
          form={form}
          tipo="Crear"
          isPendingCrear={mutation.isPending}
        />
      </form>
    </main>
  );
};
export default ProductoCrear;
