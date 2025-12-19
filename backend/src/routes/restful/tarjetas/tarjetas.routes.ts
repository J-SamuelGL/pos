import {
  verTarjetas,
  crearTarjeta,
  actualizarTarjeta,
  eliminarTarjeta,
} from "../../../controllers/restful/tarjetas/tarjetas.controller.js";
import { Router } from "express";

const tarjetasRouter = Router();

// prettier-ignore
tarjetasRouter
  .route("/")
    .get(verTarjetas)
    .post(crearTarjeta);

// prettier-ignore
tarjetasRouter
  .route("/buscar/:ID")
    .put(actualizarTarjeta)
    .delete(eliminarTarjeta)

export default tarjetasRouter;
