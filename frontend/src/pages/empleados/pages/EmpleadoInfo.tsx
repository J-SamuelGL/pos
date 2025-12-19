import { useParams } from "@tanstack/react-router";
import { useEmpleadosDetalles } from "../hooks/hookEmpleados";
import IconoCargando from "../../../../public/svg/IconoCargando";
import Encabezado from "../components/detalles/Encabezado";
import InfoPersonal from "../components/detalles/InfoPersonal";
import InfoLaboral from "../components/detalles/InfoLaboral";

const EmpleadoInfo = () => {
  const { ID } = useParams({ from: "/_menu/empleados/$ID" });
  const { data: empleado, isLoading } = useEmpleadosDetalles(ID);

  if (isLoading || !empleado?.objeto)
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-menu">
      <Encabezado empleado={empleado.objeto} />
      <InfoPersonal empleado={empleado.objeto} />
      <InfoLaboral empleado={empleado.objeto} />
    </main>
  );
};
export default EmpleadoInfo;
