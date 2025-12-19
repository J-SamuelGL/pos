import InputForm from "../components/form/editar/InputForm";
import { useFormularioActualizar } from "../hooks/form/hookForm";
import InputTextAreaForm from "../components/form/editar/InputTextAreaForm";
import BotonEnviar from "../components/form/editar/BotonEnviar";
import { useProveedorBuscar } from "../hooks/query/hookProveedores";
import IconoCargando from "../../../../../public/svg/IconoCargando";
import { useParams } from "@tanstack/react-router";

const Editar = () => {
  // datos iniciales
  const { ID: ProveedorID } = useParams({
    from: "/inventario/_inv/proveedores/editar/$ID",
  });
  const { data: proveedor, isLoading: cargandoProveedor } =
    useProveedorBuscar(ProveedorID);

  // inicializando
  const { formulario, mutation } = useFormularioActualizar(
    {
      Nombre: proveedor?.objeto.Nombre as any,
      Celular: proveedor?.objeto.Celular as any,
      Notas: proveedor?.objeto.Notas,
    },
    ProveedorID,
  );

  if (cargandoProveedor || !proveedor)
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-inventario">
      <h1>Editar proveedor</h1>
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
          tipo="Editar"
        />
      </form>
    </main>
  );
};
export default Editar;
