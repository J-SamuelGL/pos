import Tabla from "../components/index/Tabla";
import Encabezado from "../components/index/Encabezado";
import { useTablaEmpleados } from "../hooks/hookTablaEmpleados";
import { useEmpleados } from "../hooks/hookEmpleados";
import IconoCargando from "../../../../public/svg/IconoCargando";
import TablaMinima from "../components/index/TablaMinima";
import Pie from "../components/index/Pie";

const Empleados = () => {
  const { data: empleados, isLoading } = useEmpleados();
  const tabla = useTablaEmpleados(empleados?.objeto);

  if (isLoading || !empleados?.objeto)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );

  return (
    <>
      <main className="contenido-menu">
        <Encabezado tabla={tabla} />
        <div className="hidden sm:block">
          <Tabla tabla={tabla} />
        </div>
        <div className="sm:hidden">
          <TablaMinima tabla={tabla} />
        </div>
        <Pie tabla={tabla} />
      </main>
    </>
  );
};

export default Empleados;
