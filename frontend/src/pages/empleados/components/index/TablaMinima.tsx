import { useNavigate } from "@tanstack/react-router";
import { type Table } from "@tanstack/react-table";
import type { empleadoMostrarEmpleados } from "../../api/empleados.tipos";

type props = {
  tabla: Table<empleadoMostrarEmpleados>;
};
const TablaMinima = ({ tabla }: props) => {
  const navegar = useNavigate({ from: "/empleados" });

  return (
    <>
      <section className="flex flex-col gap-4">
        {tabla.getRowModel().rows.map((row) => (
          <article
            className="flex gap-4 border-b-2 border-b-gray-200 pb-2"
            key={row.original.EmpleadoID}
            onClick={() =>
              navegar({ to: "$ID", params: { ID: row.original.EmpleadoID } })
            }
          >
            <figure className="size-15 rounded-full bg-stone-200"></figure>
            <section>
              <h1 className="text-base">
                {`${row.original.Nombres} ${row.original.Apellidos}`}
              </h1>
              <h2>{row.original.roles.Nombre}</h2>
            </section>
          </article>
        ))}
      </section>
    </>
  );
};
export default TablaMinima;
