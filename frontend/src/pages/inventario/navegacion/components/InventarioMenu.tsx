import { Outlet } from "@tanstack/react-router";
import PanelNavegacion from "./PanelNavegacion";
import { useState } from "react";
import Offcanvas from "../../../../components/modales/Offcanvas";
import OffcanvasCuerpo from "../../../../components/modales/OffcanvasCuerpo";

const InventarioMenu = () => {
  const [offset, setOffset] = useState(false);
  return (
    <>
      <PanelNavegacion setActivo={setOffset} />
      <Offcanvas activo={offset} setActivo={setOffset} titulo="Sesion">
        <OffcanvasCuerpo />
      </Offcanvas>
      <Outlet />
    </>
  );
};
export default InventarioMenu;
