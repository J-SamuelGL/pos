import InputEntero from "../../../../../components/InputEntero";
import { useCompra, buscarPaquete } from "../../index/compra.state";
import { useState } from "react";
import IconoCargando from "../../../../../../public/svg/IconoCargando";
import type { TRespuestaPaquete } from "../../../paquetes/api/apiPaquetes";
import { getFormatoNumerico } from "../../../../../utils/dinero";

type props = {
  paquete: TRespuestaPaquete | undefined;
  setModalActivo: React.Dispatch<React.SetStateAction<boolean>>;
  cargandoPaquete: boolean;
};

const AgregarPaquete = ({
  setModalActivo,
  paquete,
  cargandoPaquete,
}: props) => {
  // store de la compra
  const { agregarPaquete, actualizarCantidadPaquete, eliminarPaquete } =
    useCompra((compra) => compra);

  // sacando info de la store
  const paqueteAgregado = buscarPaquete(paquete);
  const [cantidad, setCantidad] = useState(
    String(paqueteAgregado?.Cantidad || "1"),
  );

  if (cargandoPaquete)
    return (
      <div className="centrar">
        <IconoCargando />;
      </div>
    );

  // no generar html si no hay paquete por mostrar
  if (!paquete) return null;

  // handler
  const agregar = () => {
    if (paqueteAgregado) {
      actualizarCantidadPaquete(paqueteAgregado, Number(cantidad));
    } else {
      agregarPaquete({
        PaqueteID: paquete.ProveedorPaqueteID,
        Nombre: paquete.paquetes.Nombre,
        Proveedor: paquete.proveedores.Nombre,
        MedidaBase: paquete.paquetes.paquetes?.Nombre,
        PrecioCompra: Number(paquete.PrecioCompra),
        Cantidad: Number(cantidad),
        Subtotal: Number(cantidad) * Number(paquete.PrecioCompra),
      });
    }
    setModalActivo(false);
  };

  return (
    <>
      <header>
        <h1>{paquete.paquetes.Nombre}</h1>
        <h2 className="mb-4 text-lg text-gray-900">
          {/* si no tiene como medida base otro paquete, entonces es el producto mismo la base */}
          {paquete.paquetes.paquetes?.Nombre ||
            paquete.paquetes.productos.Nombre}{" "}
          &bull; {paquete.paquetes.UnidadesTotales} unidades
        </h2>
      </header>
      {/* precios */}
      <section className="mb-4 flex">
        <p className="underline decoration-red-400 underline-offset-4">
          Compra Q.{paquete.PrecioCompra}
        </p>
        <span className="mx-2">|</span>
        <p className="underline decoration-green-600 underline-offset-4">
          Venta Q.{paquete.paquetes.PrecioVenta}
        </p>
      </section>
      {/* calculadora */}
      <section className="flex flex-col">
        <h1 className="text-lg font-semibold italic">
          Subtotal Q.
          {getFormatoNumerico(Number(cantidad) * Number(paquete.PrecioCompra))}
        </h1>
        <InputEntero
          entero={cantidad}
          setEntero={setCantidad}
          seleccionarDefault={true}
        />
        {/* botones */}
        <section className="mt-4 flex gap-8">
          <button className="botonNeutral" onClick={() => agregar()}>
            {paqueteAgregado ? "Editar" : "Agregar a la nota"}
          </button>
          <button
            className="botonPeligro w-full"
            disabled={Boolean(!paqueteAgregado)}
            onClick={() => {
              // asert porque solo se activa cuando esta agregado
              eliminarPaquete(paqueteAgregado as any);
              setModalActivo(false);
            }}
          >
            Eliminar
          </button>
        </section>
      </section>
    </>
  );
};
export default AgregarPaquete;
