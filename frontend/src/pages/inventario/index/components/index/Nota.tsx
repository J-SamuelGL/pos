import { useCompra } from "../../index/compra.state";
import {
  type TCompra,
  type TDetalleCompra,
  SCompra,
} from "../../api/compra.schema";
import { useIdentificacion } from "../../../../login/hookIdentificacion";
import { useComprasCrear } from "../../index/hookCompras";
import IconoCargando from "../../../../../../public/svg/IconoCargando";
import { getFormatoNumerico } from "../../../../../utils/dinero";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  setPaqueteID: React.Dispatch<React.SetStateAction<number | null>>;
};

const Nota = ({ setActivo, setPaqueteID }: props) => {
  // query
  const { mutate, isPending } = useComprasCrear();
  const { data: empleado } = useIdentificacion();

  // store
  const { DetallesCompra, Total, limpiar } = useCompra((estado) => estado);

  // para estar seguros
  if (!empleado)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );

  // agrega los datos faltantes a la compra
  const crearCompra = () => {
    // se cortan los datos como Nombre, Proveedor, etc
    const detallesCurados: TDetalleCompra[] = DetallesCompra.map((detalle) => ({
      PaqueteID: detalle.PaqueteID,
      Cantidad: detalle.Cantidad,
      PrecioCompra: detalle.PrecioCompra,
      Subtotal: detalle.Subtotal,
    }));

    const compraCurada: TCompra = {
      EmpleadoID: empleado.objeto.EmpleadoID,
      Total,
      DetallesCompra: detallesCurados,
      FechaHora: new Date(),
    };
    const compra = SCompra.safeParse(compraCurada);
    if (!compra.success) return alert("Se ingresaron malos datos");
    mutate(compra.data, {
      onSuccess: () => {
        limpiar();
      },
    });
  };

  return (
    <aside className="w-nota-ancho top-barra-inventario-altura fixed right-0 flex h-[calc(100vh-var(--spacing-barra-inventario-altura))] flex-col border-l-2 border-l-gray-200 bg-white">
      {/* encabezado */}
      <header>
        <h1>Nota de compra</h1>
        <button
          disabled={!DetallesCompra.length}
          className="botonNeutral mt-1 w-full bg-yellow-400 p-2"
          onClick={() => {
            limpiar();
          }}
        >
          Limpiar
        </button>
      </header>
      {/* cuerpo */}
      <section className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
        {/* renderizar paquetes */}
        {DetallesCompra.map((paquete) => (
          <article
            key={paquete.PaqueteID}
            className="hover:border-l-acento flex flex-col rounded-md border-2 border-gray-200 bg-white p-2 hover:cursor-pointer"
            onClick={() => {
              setActivo(true);
              setPaqueteID(paquete.PaqueteID);
            }}
          >
            <h2 className="font-extrabold">
              Subtotal: Q.{getFormatoNumerico(paquete.Subtotal)}
            </h2>
            <h1 className="font-medium">{paquete.Nombre}</h1>
            <h2>{paquete.Proveedor}</h2>
            <h2 className="self-end underline">
              {getFormatoNumerico(paquete.Cantidad)} paquetes
            </h2>
          </article>
        ))}
      </section>
      {/* pie */}
      <footer className="w-full border-t-2 bg-white">
        {/* Total */}
        <article className="flex items-center justify-between px-1">
          <h2 className="text-xl font-light">TOTAL</h2>
          <strong className="text-2xl">Q.{getFormatoNumerico(Total)}</strong>
        </article>
        <button
          className="botonNeutral w-full p-4"
          disabled={!DetallesCompra.length || isPending}
          onClick={() => crearCompra()}
        >
          {isPending ? (
            <span className="flex justify-center">
              <IconoCargando boton={true} />
            </span>
          ) : (
            "Crear compra"
          )}
        </button>
      </footer>
    </aside>
  );
};
export default Nota;
