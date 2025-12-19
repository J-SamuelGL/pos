import IconoCargando from "../../../../../public/svg/IconoCargando";
import IconoCrear from "../../../../../public/svg/IconoCrear";
import { useProveedores } from "../hooks/query/hookProveedores";
import { Link, useNavigate } from "@tanstack/react-router";

const Index = () => {
  const navegar = useNavigate({ from: "/inventario/proveedores" });
  const { data: proveedores, isLoading: cargandoProveedores } =
    useProveedores();

  if (cargandoProveedores || !proveedores)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );

  return (
    <main className="contenido-inventario">
      <header className="flex justify-between">
        <h1 className="titulo-contenido mb-4">Proveedores</h1>
        <Link
          to="/inventario/proveedores/crear"
          className="flex rounded-lg bg-indigo-200 p-2 sm:static sm:w-15 sm:justify-center"
        >
          <IconoCrear />
        </Link>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* tarjetas */}
        {proveedores.objeto.map((proveedor) => (
          <article
            key={proveedor.ProveedorID}
            className="tarjeta hover:cursor-pointer hover:rounded-sm hover:border-2 hover:border-indigo-300"
            onClick={() =>
              navegar({
                to: "editar/$ID",
                params: { ID: String(proveedor.ProveedorID) },
              })
            }
          >
            <header className="bg-indigo-200 py-2">
              <h1 className="ml-2">{proveedor.Nombre}</h1>
            </header>
            <section className="flex flex-col px-4 py-2">
              <h2 className="font-thin">Celular</h2>
              <p className="font-medium">{proveedor.Celular}</p>
              <h2 className="font-thin">Notas</h2>
              <p className="font-medium">
                {proveedor.Notas || "No hay notas..."}
              </p>
            </section>
          </article>
        ))}
      </section>
    </main>
  );
};
export default Index;
