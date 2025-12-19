import { type empleadoBuscarEmpleado } from "../../api/empleados.tipos";
import { getFormatoNumerico } from "../../../../utils/dinero";

type props = {
  empleado: empleadoBuscarEmpleado;
};

type TDetalles = {
  campo: string;
  valor: any;
};

const InfoLaboral = ({ empleado }: props) => {
  // detalles
  const detalles: TDetalles[] = [
    {
      campo: "Rol",
      valor: empleado.roles.Nombre,
    },
    {
      campo: "Salario",
      valor: `Q.${getFormatoNumerico(empleado.Salario)}`,
    },
    {
      campo: "Usuario",
      valor: empleado.Usuario,
    },
    {
      campo: "Fecha que se contrató",
      valor: empleado.FechaContratado,
    },
    {
      campo: "Fin de labores",
      valor: empleado.FechaFinLabores || "Activo",
    },
  ];
  return (
    <article className="tarjeta mb-10 rounded-2xl p-4">
      <h1 className="titulo-contenido mb-2">Información laboral</h1>
      <section className="grid grid-cols-2 gap-4">
        {detalles.map((detalle, index) => (
          <article key={index}>
            <h2 className="font-thin">{detalle.campo}</h2>
            <p className="font-medium">{detalle.valor}</p>
          </article>
        ))}
      </section>
    </article>
  );
};
export default InfoLaboral;
