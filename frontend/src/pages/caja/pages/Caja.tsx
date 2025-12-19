import Offcanvas from "../../../components/modales/Offcanvas";
import OffcanvasCuerpo from "../../../components/modales/OffcanvasCuerpo";
import { useProductosFull } from "../../inventario/productos/hooks/hookProductos";
import useTablaProductos from "../../../hooks/tablas/hookTablaProductos";
import Grid from "../components/index/index/Grid";
import ModalEntidad from "../../../components/modales/ModalEntidad";
import { useState } from "react";
import { useProductoBuscar } from "../../inventario/productos/hooks/hookProductos";
import DetallesProducto from "../components/index/modales/producto/DetallesProducto";
import Nota from "../components/index/index/Nota";
import Modal from "../../../components/modales/Modal";
import DatosFinales from "../components/index/modales/datos-finales/Index";
import Encabezado from "../components/index/index/Encabezado";
import IconoCargando from "../../../../public/svg/IconoCargando";

const Caja = () => {
  // tabla
  const { data: productos, isLoading: cargandoProductos } = useProductosFull();
  const tabla = useTablaProductos(productos?.objeto);

  // modales
  // -> producto
  const [modalProducto, setModalProducto] = useState(false);
  const [productoID, setProductoID] = useState<number | null>(null);
  const { data: producto, isLoading: cargandoProducto } =
    useProductoBuscar(productoID);

  // -> offcanvas
  const [canvas, setCanvas] = useState(false);

  // -> cliente
  const [modalCliente, setModalCliente] = useState(false);

  if (cargandoProductos || !productos) {
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  }

  return (
    <>
      {/* <header className="mx-4 mt-2 mb-4">
        <BarraBusqueda tabla={tabla} />
      </header> */}
      <Encabezado tabla={tabla} setOffcanvas={setCanvas} />
      <Offcanvas activo={canvas} setActivo={setCanvas} titulo="Sesion">
        <OffcanvasCuerpo />
      </Offcanvas>
      <Grid tabla={tabla} setActivo={setModalProducto} setID={setProductoID} />
      {/* modal producto */}
      <ModalEntidad
        activo={modalProducto}
        setActivo={setModalProducto}
        setID={setProductoID}
        titulo="Producto"
      >
        <DetallesProducto
          producto={producto?.objeto}
          cargandoProducto={cargandoProducto}
        />
      </ModalEntidad>
      <Nota
        setModalProducto={setModalProducto}
        setProductoID={setProductoID}
        setModalClientes={setModalCliente}
      />
      {/* modal clientes */}
      <Modal activo={modalCliente} setActivo={setModalCliente} titulo="Factura">
        <DatosFinales setActivo={setModalCliente} />
      </Modal>
    </>
  );
};

export default Caja;
