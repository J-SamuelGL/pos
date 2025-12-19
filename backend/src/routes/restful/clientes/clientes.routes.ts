import {
  crearCliente,
  verClientes,
} from "../../../controllers/restful/clientes/clientes.controller.js";
import { Router } from "express";

const clientesRouter = Router();

// prettier-ignore
clientesRouter
  .route("/")
    .get(verClientes)
    .post(crearCliente);

export default clientesRouter;
