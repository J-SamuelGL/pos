import { useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const Navegacion = () => {
  const [offcanvas, setOffcanvas] = useState(false);

  return (
    <>
      {/* Celulares */}
      <nav className="h-barra-menu-altura sticky z-20 flex items-center bg-slate-100 p-3 shadow-sm sm:hidden">
        <Navbar activo={offcanvas} setActivo={setOffcanvas} />
      </nav>
      {/* Pantallas grande */}
      <aside className="sm:w-panel-menu-ancho hidden sm:fixed sm:z-20 sm:flex sm:h-screen sm:flex-col sm:items-center sm:bg-slate-100 sm:p-2 lg:p-4">
        <SideBar setActivo={setOffcanvas} />
      </aside>
    </>
  );
};
export default Navegacion;
