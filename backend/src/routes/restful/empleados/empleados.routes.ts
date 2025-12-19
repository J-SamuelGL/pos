import { Router } from "express";
import {
  verEmpleados,
  crearEmpleado,
  buscarEmpleado,
  actualizarEmpleado,
} from "../../../controllers/restful/empleados/empleados.controller.js";
const empleadosRouter = Router();

// prettier-ignore
// * crear y mostrar empleados
empleadosRouter
  .route("/")
    .get(verEmpleados)
    .post(crearEmpleado);

// prettier-ignore
// * actualizar y buscar empleados individualmente
empleadosRouter
  .route("/buscar/:ID")
    .get(buscarEmpleado)
    .put(actualizarEmpleado);

export default empleadosRouter;
