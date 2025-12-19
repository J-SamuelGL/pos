import { useState } from "react";
import BarraBusqueda from "../../components/BarraBusqueda";
import ModalEntidad from "../../components/modales/ModalEntidad";
import {
  useCompras,
  useDetallesComprasBuscar,
} from "../inventario/index/index/hookCompras";
import { useTablaCompras } from "./hookTablaCompras";
import TablaCompras from "./components/TablaCompra";
import TablaDetalleCompra from "./components/TablaDetalleCompra";
import IconoCargando from "../../../public/svg/IconoCargando";

const HistorialCompras = () => {
  const { data: compras, isLoading } = useCompras();
  const tabla = useTablaCompras(compras?.objeto);

  // modal
  const [abierto, setAbierto] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const { data: detallesCompra } = useDetallesComprasBuscar(id);

  if (isLoading || !compras?.objeto) {
    return (
      <div className="centrar tarjeta-contenido">
        <IconoCargando />
      </div>
    );
  }
  return (
    <main className="contenido-menu">
      <h1 className="mb-2">Historial de Compras</h1>
      <div className="mb-4">
        <BarraBusqueda tabla={tabla} />
      </div>
      <TablaCompras tabla={tabla} setAbierto={setAbierto} setId={setId} />
      <ModalEntidad
        activo={abierto}
        setActivo={setAbierto}
        titulo="Detalle"
        setID={setId}
      >
        <TablaDetalleCompra detalles={detallesCompra?.objeto} />
      </ModalEntidad>
    </main>
  );
};
export default HistorialCompras;
