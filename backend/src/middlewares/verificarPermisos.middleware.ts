import { Request, Response, NextFunction } from "express";
import { ROLES } from "../types/autentificacion.js";

const verificarRoles = (permisosRequeridos: ROLES[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!permisosRequeridos.includes(req.JWTpayload?.rol as ROLES)) {
        return res.status(403).json({
          error: true,
          mensaje: "Este módulo está restringido!",
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
};

export default verificarRoles;
