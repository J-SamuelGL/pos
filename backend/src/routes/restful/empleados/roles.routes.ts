import { Router } from "express";
import { verRoles } from "../../../controllers/restful/empleados/roles.controller.js";

const rolesRouter = Router();

// prettier-ignore
rolesRouter
  .route("/")
    .get(verRoles)

export default rolesRouter;
