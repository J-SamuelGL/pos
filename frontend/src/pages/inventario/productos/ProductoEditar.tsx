import { useParams } from "@tanstack/react-router";
import { useProductoBuscarActualizar } from "./hooks/hookProductos";
import { useFormularioActualizarProducto } from "./hooks/hookProductoFormulario";
import InputForm from "./components/formularios/editar/InputForm";
import InputTextAreaForm from "./components/formularios/editar/InputTextAreaForm";
import InputNumeroForm from "./components/formularios/editar/InputNumeroForm";
import BotonEnviar from "./components/formularios/crear/BotonEnviar";
import IconoCargando from "../../../../public/svg/IconoCargando";

const InventarioProductoEditar = () => {
  const { ID } = useParams({ from: "/inventario/_inv/productos/editar/$ID" });
  const { data: producto, isLoading } = useProductoBuscarActualizar(ID as any);

  const { formulario: form, mutation } = useFormularioActualizarProducto(
    ID,
    producto as any,
  );
  if (isLoading || !producto)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-inventario">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h1>Editar producto</h1>
        <InputForm form={form} name="Nombre" tipo="text" />
        <InputTextAreaForm form={form} name="Descripcion" />
        <InputNumeroForm form={form} name="PrecioVenta" />
        <BotonEnviar
          form={form}
          tipo="Editar"
          isPendingActualizar={mutation.isPending}
        />
      </form>
    </main>
  );
};
export default InventarioProductoEditar;
