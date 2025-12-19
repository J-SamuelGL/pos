import {
  verProveedores,
  actualizarProveedor,
  buscarProveedor,
  crearProveedores,
} from "../../../controllers/restful/proveedores/proveedores.controller.js";
import { Router } from "express";

const proveedoresRouter = Router();

// prettier-ignore
proveedoresRouter
  .route("/")
    .get(verProveedores)
    .post(crearProveedores);

// prettier-ignore
proveedoresRouter
  .route("/buscar/:ID")
    .get(buscarProveedor)
    .put(actualizarProveedor)

export default proveedoresRouter;
