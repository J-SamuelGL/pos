import { usePaquetes } from "../../paquetes/hooks/hookPaquetes";
import IconoCargando from "../../../../../public/svg/IconoCargando";
import BarraBusqueda from "../../../../components/BarraBusqueda";
import Grid from "../components/index/Grid";
import { useTablaPaquetes } from "../../paquetes/hooks/hookTablaPaquetes";
import ModalEntidad from "../../../../components/modales/ModalEntidad";
import { useState } from "react";
import { usePaqueteBuscar } from "../../paquetes/hooks/hookPaquetes";
import AgregarPaquete from "../components/modal/AgregarPaquete";
import Nota from "../components/index/Nota";

// TODO hacerlo responsivo
const RegistrarCompra = () => {
  // modal
  const [modalAgregar, setModalAgregar] = useState(false);
  const [paqueteID, setPaqueteID] = useState<number | null>(null);
  const { data: paquete, isLoading: cargandoPaquete } =
    usePaqueteBuscar(paqueteID);

  // tabla
  const { data: paquetes, isLoading: isLoadingPaquetes } = usePaquetes();
  const tabla = useTablaPaquetes(paquetes?.objeto);

  if (isLoadingPaquetes || !paquetes)
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );

  return (
    <>
      <main className="mr-nota-ancho min-h-[calc(100vh-var(--spacing-barra-inventario-altura))] bg-stone-50 px-2 py-4">
        <header>
          <h1 className="mb-2">Registrar compra</h1>
          <div className="mb-3">
            <BarraBusqueda tabla={tabla} />
          </div>
        </header>
        <Grid
          tabla={tabla}
          setModalActivo={setModalAgregar}
          setPaqueteID={setPaqueteID}
        />
      </main>
      <ModalEntidad
        titulo="Agregar paquete"
        activo={modalAgregar}
        setActivo={setModalAgregar}
        setID={setPaqueteID}
      >
        <AgregarPaquete
          paquete={paquete?.objeto}
          cargandoPaquete={cargandoPaquete}
          setModalActivo={setModalAgregar}
        />
      </ModalEntidad>
      <Nota setActivo={setModalAgregar} setPaqueteID={setPaqueteID} />
    </>
  );
};

export default RegistrarCompra;
