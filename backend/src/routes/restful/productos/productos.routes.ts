import {
  crearProducto,
  verProductos,
  buscarProducto,
  actualizarProducto,
} from "../../../controllers/restful/productos/productos.controller.js";
import { Router } from "express";

const productosRouter = Router();

// prettier-ignore
productosRouter
  .route("/")
    .get(verProductos)
    .post(crearProducto);

// prettier-ignore
productosRouter
  .route("/buscar/:ID")
    .get(buscarProducto)
    .put(actualizarProducto)

export default productosRouter;
