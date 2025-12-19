import { useFormActualizarPaquete } from "../hooks/hookFormPaquetes";
import { useParams } from "@tanstack/react-router";
import { usePaqueteBuscar } from "../hooks/hookPaquetes";
import InputForm from "../components/editar/InputForm";
import InputNumeroForm from "../components/editar/InputNumeroForm";
import BotonEnviar from "../components/editar/BotonEnviar";
import IconoCargando from "../../../../../public/svg/IconoCargando";
import InputTextAreaForm from "../components/editar/InputTextAreaForm";
import InputSelectForm from "../components/editar/InputSelectForm";
import { usePaquetesRecursivo } from "../hooks/hookPaquetes";
import { useProveedores } from "../../proveedores/hooks/query/hookProveedores";

// TODO Falta implementar actualizar
const EditarPaquete = () => {
  const { ID } = useParams({ from: "/inventario/_inv/paquetes/editar/$ID" });
  const { data: paquete, isLoading: cargandoPaquete } = usePaqueteBuscar(ID);
  const { form, mutation } = useFormActualizarPaquete(
    ID,
    paquete?.paquete as any,
  );
  const { data: paquetes, isLoading: isLoadingPaquetes } =
    usePaquetesRecursivo();
  const { data: proveedores, isLoading: cargandoProveedores } =
    useProveedores();

  if (
    cargandoPaquete ||
    !paquete ||
    isLoadingPaquetes ||
    !paquetes ||
    !proveedores ||
    cargandoProveedores
  ) {
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  }

  // transformando proveedores para react-select
  const proveedoresSelect = proveedores.objeto.map((proveedor) => ({
    label: proveedor.Nombre,
    value: proveedor.ProveedorID,
  }));

  return (
    <main className="contenido-inventario">
      <h1>Editar paquete</h1>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <fieldset>
          <label>Producto</label>
          <input
            value={paquete?.producto}
            disabled
            className="inputForm opacity-50 hover:cursor-not-allowed"
          />
        </fieldset>
        <InputForm form={form} name="Nombre" tipo="text" />
        <InputSelectForm
          form={form}
          label="Proveedor"
          name="ProveedorID"
          notFound="Ese proveedor no existe"
          options={proveedoresSelect}
          placeholder="Seleccione un proveedor"
        />
        <InputTextAreaForm form={form} name="Descripcion" />
        <InputSelectForm
          form={form}
          label="Medida base"
          name="MedidaBase"
          notFound="Ese paquete no existe"
          options={paquetes}
          placeholder="Seleccione un paquete si aplica"
        />
        <InputNumeroForm form={form} name="UnidadesTotales" />
        <InputNumeroForm form={form} name="PrecioVenta" />
        <BotonEnviar form={form} tipo="Editar" isPending={mutation.isPending} />
      </form>
    </main>
  );
};
export default EditarPaquete;
