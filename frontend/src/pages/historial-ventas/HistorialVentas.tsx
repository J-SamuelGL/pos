import BarraBusqueda from "../../components/BarraBusqueda";
import { useTablaVentas } from "./hookTablaVentas";
import { useVentas, useDetallesVentasBuscar } from "../caja/hooks/hookVentas";
import TablaVentas from "./components/TablaVentas";
import ModalEntidad from "../../components/modales/ModalEntidad";
import { useState } from "react";
import TablaDetallesVentas from "./components/TablaDetallesVentas";
import IconoCargando from "../../../public/svg/IconoCargando";

const HistorialVentas = () => {
  const { data: ventas, isLoading } = useVentas();
  const tabla = useTablaVentas(ventas?.objeto);

  // modal
  const [abierto, setAbierto] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const { data: detallesVenta } = useDetallesVentasBuscar(id);

  if (isLoading || !ventas?.objeto) {
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );
  }

  return (
    <main className="contenido-menu">
      <h1 className="mb-2">Historial de Ventas</h1>
      <div className="mb-4">
        <BarraBusqueda tabla={tabla} />
      </div>
      <TablaVentas tabla={tabla} setAbierto={setAbierto} setId={setId} />
      <ModalEntidad
        activo={abierto}
        setActivo={setAbierto}
        titulo="Detalle"
        setID={setId}
      >
        <TablaDetallesVentas detalles={detallesVenta?.objeto} />
      </ModalEntidad>
    </main>
  );
};
export default HistorialVentas;
