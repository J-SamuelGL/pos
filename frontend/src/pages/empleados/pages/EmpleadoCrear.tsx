import { useFormularioCrearEmpleado } from "../hooks/formularios/hookEmpleadoCrear";
import { useRoles } from "../hooks/hookEmpleados";
import InputForm from "../components/formularios/crear/InputForm";
import InputSelectForm from "../components/formularios/crear/InputSelectForm";
import BotonEnviar from "../components/formularios/crear/BotonEnviar";
import IconoCargando from "../../../../public/svg/IconoCargando";
import InputNumeroForm from "../components/formularios/crear/InputNumeroForm";

const EmpleadoCrear = () => {
  const { data: roles, isLoading } = useRoles();
  const { formulario: form, mutation } = useFormularioCrearEmpleado();

  if (isLoading || !roles)
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
        <header>
          <h1 className="titulo-menu mb-4 text-center sm:text-left">
            Crear usuario
          </h1>
          <figure className="flex w-full justify-center">
            <div className="size-30 rounded-full bg-stone-200"></div>
          </figure>
        </header>
        <InputSelectForm
          form={form}
          label="Rol"
          name="RolID"
          notFound="Ese rol no existe"
          options={roles}
          placeholder="Seleccione un rol"
          clase="mb-4"
        />
        <InputForm form={form} name="Nombres" tipo="text" />
        <InputForm form={form} name="Apellidos" tipo="text" />
        <InputNumeroForm form={form} name="Salario" />
        <InputForm form={form} name="Celular" tipo="text" />
        <InputSelectForm
          form={form}
          label="Genero"
          name="Genero"
          notFound="Sin resultado"
          options={[
            { value: "Hombre", label: "Hombre" },
            { value: "Mujer", label: "Mujer" },
          ]}
          placeholder="Seleccione el genero"
          clase="mb-4"
        />
        <InputForm
          form={form}
          name="FechaNacimiento"
          titulo="Fecha de Nacimiento"
          tipo="date"
        />
        <InputForm
          form={form}
          name="FechaContratado"
          titulo="Fecha de Contratación"
          tipo="date"
        />
        <InputForm form={form} name="Usuario" tipo="text" />
        <InputForm form={form} name="Clave" tipo="password" />
        <div className="flex w-full">
          <BotonEnviar
            form={form}
            tipo="Crear"
            isPending={mutation.isPending}
            clase="w-full"
          />
        </div>
      </form>
    </main>
  );
};
export default EmpleadoCrear;
