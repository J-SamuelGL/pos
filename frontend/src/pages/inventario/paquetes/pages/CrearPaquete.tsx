import { useFormCrearPaquete } from "../hooks/hookFormPaquetes";
import InputForm from "../components/crear/InputForm";
import InputNumeroForm from "../components/crear/InputNumeroForm";
import InputSelectForm from "../components/crear/InputSelectForm";
import { useProductos } from "../../productos/hooks/hookProductos";
import BotonEnviar from "../components/crear/BotonEnviar";
import IconoCargando from "../../../../../public/svg/IconoCargando";
import InputTextAreaForm from "../components/crear/InputTextAreaForm";
import { usePaquetesRecursivo } from "../hooks/hookPaquetes";
import { useProveedores } from "../../proveedores/hooks/query/hookProveedores";

const CrearPaquete = () => {
  const { form, mutation } = useFormCrearPaquete();
  const { data: productos, isLoading } = useProductos();
  const { data: paquetes, isLoading: isLoadingPaquetes } =
    usePaquetesRecursivo();
  const { data: proveedores, isLoading: cargandoProveedores } =
    useProveedores();

  if (
    isLoading ||
    !productos ||
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
      <h1>Crear paquete</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <InputSelectForm
          form={form}
          label="Producto"
          name="ProductoID"
          notFound="Ese producto no existe"
          placeholder="Seleccione un producto"
          options={productos}
          clase="mb-4"
        />
        <InputSelectForm
          form={form}
          label="Proveedor"
          name="ProveedorID"
          notFound="Ese proveedor no existe"
          placeholder="Seleccione un proveedor"
          options={proveedoresSelect}
          clase="mb-4"
        />
        <InputForm form={form} name="Nombre" tipo="text" />
        <InputTextAreaForm form={form} name="Descripcion" />
        <InputSelectForm
          form={form}
          label="Medida base"
          name="MedidaBase"
          notFound="Ese paquete no existe"
          options={paquetes}
          placeholder="Seleccione un paquete si aplica"
          clase="mb-4"
        />
        <InputNumeroForm
          form={form}
          name="UnidadesTotales"
          titulo="Unidades totales que trae el paquete"
        />
        <InputNumeroForm form={form} name="PrecioVenta" titulo="Precio venta" />
        <InputNumeroForm
          form={form}
          name="PrecioCompra"
          titulo="Precio compra"
        />
        <div className="mb-4">
          <BotonEnviar
            form={form}
            tipo="Crear"
            isPending={mutation.isPending}
          />
        </div>
      </form>
    </main>
  );
};
export default CrearPaquete;
