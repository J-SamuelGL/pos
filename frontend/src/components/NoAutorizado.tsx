import { Link } from "@tanstack/react-router";

const NoAutorizado = () => {
  return (
    <main className="centrar">
      <h1>No tiene permisos para acceder a este recurso</h1>
      <section className="flex w-1/4 justify-between">
        <Link to="/caja">Caja</Link>
        <Link to="/inventario">Compras</Link>
      </section>
    </main>
  );
};
export default NoAutorizado;
