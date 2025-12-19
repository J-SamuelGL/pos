import { useFormularioActualizarEmpleado } from "../hooks/formularios/hookEmpleadoEditar";
import InputForm from "../components/formularios/editar/InputForm";
import InputSelectForm from "../components/formularios/editar/InputSelectForm";
import BotonEnviar from "../components/formularios/editar/BotonEnviar";
import { useParams } from "@tanstack/react-router";
import { useEmpleadosDetallesForm } from "../hooks/hookEmpleados";
import { useRoles } from "../hooks/hookEmpleados";
import IconoCargando from "../../../../public/svg/IconoCargando";
import InputNumeroForm from "../components/formularios/editar/InputNumeroForm";

const EmpleadoEditar = () => {
  const { ID } = useParams({ from: "/_menu/empleados/editar/$ID" });
  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const { data: empleado, isLoading: isLoadingEmpleados } =
    useEmpleadosDetallesForm(ID);
  const { formulario: form, mutation } = useFormularioActualizarEmpleado(
    empleado as any,
    ID,
  );

  if (isLoadingEmpleados || isLoadingRoles || !roles || !empleado)
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-menu">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h1 className="titulo-contenido mb-4">Editar empleados</h1>
        <InputSelectForm
          form={form}
          label="Nuevo rol"
          name="RolID"
          notFound="Ese rol no existe"
          placeholder="Seleccione un rol"
          options={roles}
          clase="mb-4"
        />
        <InputForm form={form} name="Nombres" tipo="text" />
        <InputForm form={form} name="Apellidos" tipo="text" />
        <InputForm form={form} name="Usuario" tipo="text" />
        <InputNumeroForm form={form} name="Salario" />
        <InputForm form={form} name="Celular" tipo="text" />
        <InputForm
          form={form}
          name="FechaNacimiento"
          titulo="Fecha de Nacimiento"
          tipo="date"
        />
        <InputForm
          form={form}
          name="FechaFinLabores"
          titulo="Fecha despido"
          tipo="date"
        />
        <BotonEnviar form={form} tipo="Editar" isPending={mutation.isPending} />
      </form>
    </main>
  );
};
export default EmpleadoEditar;
