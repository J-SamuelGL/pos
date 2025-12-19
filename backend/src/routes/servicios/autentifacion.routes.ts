import { Router } from "express";
import {
  logeo,
  actualizarClave,
  anularTokens,
  refrescarTokenAcceso,
} from "../../controllers/servicios/autentificacion.controller.js";
import { verificadorJWT } from "../../middlewares/verificarJWT.middelware.js";

const autentificacionRouter = Router();

// * autentificacion y cambio de clave
// prettier-ignore
autentificacionRouter
  .route("/")
    .post(logeo)
    // * rutas protegidas
    .put(verificadorJWT, actualizarClave)
    .get(anularTokens);

// prettier-ignore
autentificacionRouter
  .route("/refrescar")
    .get(refrescarTokenAcceso);

export default autentificacionRouter;
