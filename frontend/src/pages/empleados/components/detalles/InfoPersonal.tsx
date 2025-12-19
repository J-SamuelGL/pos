import { type empleadoBuscarEmpleado } from "../../api/empleados.tipos";

type props = {
  empleado: empleadoBuscarEmpleado;
};

type TDetalles = {
  campo: string;
  valor: any;
};

const InfoPersonal = ({ empleado }: props) => {
  // detalles
  const detalles: TDetalles[] = [
    {
      campo: "Nombres",
      valor: empleado.Nombres,
    },
    {
      campo: "Apellidos",
      valor: empleado.Apellidos,
    },
    {
      campo: "Celular",
      valor: empleado.Celular || "No disponible",
    },
    {
      campo: "Genero",
      valor: empleado.Genero,
    },
    {
      campo: "Fecha de Nacimiento",
      valor: empleado.FechaNacimiento || "No disponible",
    },
  ];

  return (
    <article className="tarjeta mb-10 rounded-2xl p-4">
      <h1 className="titulo-contenido mb-2">Información personal</h1>
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
export default InfoPersonal;
