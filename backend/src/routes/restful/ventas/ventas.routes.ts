import { Router } from "express";
import {
  crearVenta,
  verVentas,
  buscarDetalle,
} from "../../../controllers/restful/ventas/ventas.controller.js";

const ventasRouter = Router();

// prettier-ignore
ventasRouter
  .route('/')
    .post(crearVenta)
    .get(verVentas)

ventasRouter.route("/buscar/:ID").get(buscarDetalle);

export default ventasRouter;
