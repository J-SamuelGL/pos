import { Router } from "express";
import {
  crearCompra,
  verCompras,
  buscarDetalle,
} from "../../../controllers/restful/inventario/compras.controller.js";

const comprasRouter = Router();

// prettier-ignore
comprasRouter
  .route('/')
    .post(crearCompra)
    .get(verCompras)

comprasRouter.route("/buscar/:ID").get(buscarDetalle);
export default comprasRouter;
