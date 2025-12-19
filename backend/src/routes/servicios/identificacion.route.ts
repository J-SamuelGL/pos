import { Router } from "express";
import mostrarIdentificacion from "../../controllers/servicios/identificacion.controller.js";

const identificacionRouter = Router();

identificacionRouter.get("/", mostrarIdentificacion);

export default identificacionRouter;
