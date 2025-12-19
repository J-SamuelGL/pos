import { Router } from "express";
import {
  verPaquetes,
  crearPaquetes,
  buscarPaquete,
  actualizarPaquete,
} from "../../../controllers/restful/inventario/paquetes.controller.js";

const paquetesRouter = Router();

// prettier-ignore
paquetesRouter
  .route('/')
    .get(verPaquetes)
    .post(crearPaquetes)

// prettier-ignore
paquetesRouter
  .route("/buscar/:ID")
    .get(buscarPaquete)
    .put(actualizarPaquete)

export default paquetesRouter;
