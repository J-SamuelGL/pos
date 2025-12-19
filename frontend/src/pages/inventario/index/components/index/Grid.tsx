import type { Table } from "@tanstack/react-table";
import type { TRespuestaPaquete } from "../../../paquetes/api/apiPaquetes";
import { buscarPaquete } from "../../index/compra.state";
import IconoCheck from "../../../../../../public/svg/IconoCheck";

type props = {
  tabla: Table<TRespuestaPaquete>;
  setModalActivo: React.Dispatch<React.SetStateAction<boolean>>;
  setPaqueteID: React.Dispatch<React.SetStateAction<number | null>>;
};

const Grid = ({ tabla, setModalActivo, setPaqueteID }: props) => {
  // obteniendo lista de productos sin repetidos
  const columnaProductos = tabla.getColumn("NombreProducto");
  const productos = columnaProductos
    ? (Array.from(columnaProductos.getFacetedUniqueValues().keys()) as string[])
    : [];

  // agrupando paquetes por producto
  const paquetesPorProducto = productos.map((producto) => ({
    nombre: producto,
    paquetes: tabla
      .getRowModel()
      .rows.filter(
        // obteniendo solo los paquetes correspondientes
        (fila) => fila.original.paquetes.productos.Nombre === producto,
      )
      // devolviendo los paquetes despues de haber filtrado
      .map((paquete) => ({
        ...paquete.original,
      })),
  }));

  return (
    <section className="grid grid-cols-1 gap-8">
      {!columnaProductos ? (
        <div>No se encontró la columna de productos</div>
      ) : (
        paquetesPorProducto.map((producto) => (
          // producto
          <article key={producto.nombre} className="tarjeta">
            <header className="bg-indigo-50 p-2">
              <h1 className="text-lg font-medium">{producto.nombre}</h1>
            </header>
            {/* paquetes */}
            <section className="grid grid-cols-1 gap-4 p-2">
              {producto.paquetes.map((paquete) => (
                <article
                  key={paquete.ProveedorPaqueteID}
                  className="linea group relative pb-2 hover:cursor-pointer"
                  onClick={() => {
                    setModalActivo(true);
                    setPaqueteID(paquete.ProveedorPaqueteID);
                  }}
                >
                  {/* marcar con chequesito si ya existe */}
                  {buscarPaquete(paquete) && (
                    <figure className="absolute top-0 right-0">
                      <IconoCheck />
                    </figure>
                  )}
                  <h1 className="mb-4 text-xl group-hover:underline">
                    {paquete.paquetes.Nombre}
                  </h1>
                  {/* detalles */}
                  <dl>
                    <div>
                      <dt>Proveedor</dt>
                      <dd>{paquete.proveedores.Nombre}</dd>
                    </div>
                    <div>
                      <dt>Descripción</dt>
                      <dd>
                        {paquete.paquetes.Descripcion || "Sin descripción"}
                      </dd>
                    </div>
                    <div>
                      <dt>Medida base</dt>
                      <dd>{paquete.paquetes.paquetes?.Nombre || "N/A"}</dd>
                    </div>
                    <div>
                      <dt>Unidades por paquete</dt>
                      <dd>{paquete.paquetes.UnidadesTotales}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </section>
          </article>
        ))
      )}
    </section>
  );
};
export default Grid;
