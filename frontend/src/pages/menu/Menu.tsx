import Navegacion from "./navegacion/Navegacion";
import { Outlet } from "@tanstack/react-router";

const Menu = () => {
  return (
    <>
      <Navegacion />
      <Outlet />
    </>
  );
};
export default Menu;
