import { Router } from "express";
import { getReportes } from "../../controllers/servicios/reportes.controller.js";

const reportesRouter = Router();

// prettier-ignore
reportesRouter
  .route("/")
    .post(getReportes)

export default reportesRouter;
