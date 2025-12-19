import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { verProductos } from "../pages/inventario/productos/api/apiProductos";
import { Suspense } from "react";

const useProductos = () => {
  return useSuspenseQuery({
    queryKey: ["productos"],
    queryFn: () => verProductos(),
  });
};

export const Route = createFileRoute("/prueba")({
  component: () => (
    <Suspense fallback={<h1>Hola</h1>}>
      <RouteComponent />
    </Suspense>
  ),
});

function RouteComponent() {
  const { data: productos } = useProductos();
  return productos.objeto.map(() => (
    <article className="tarjeta">
      <h1>{productos.objeto}</h1>
    </article>
  ));
}
