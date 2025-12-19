import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { type payloadTokenAcceso, TOKEN } from "../types/autentificacion.js";
import { PrismaClient } from "@prisma/client";
import {
  tokenAccesoCookieOpciones,
  tokenRefrescoCookieOpciones,
} from "../config/configuracionCredenciales.js";

const prisma = new PrismaClient();

export const verificadorJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // obteniendo el token
    const tokenAcceso = req.cookies[TOKEN.ACCESO];
    if (!tokenAcceso) {
      res.clearCookie(TOKEN.ACCESO, tokenAccesoCookieOpciones);
      res.clearCookie(TOKEN.REFRESCO, tokenRefrescoCookieOpciones);
      return res
        .status(401)
        .json({ error: true, mensaje: "No ha iniciado sesión!" });
    }

    // decifrando
    const tokenDecifrado = jwt.verify(
      tokenAcceso,
      process.env.TOKEN_ACCESO_CLAVE
    ) as payloadTokenAcceso;

    // obteniendo la version mas reciente del token
    const empleado = await prisma.empleados.findUnique({
      select: { VersionToken: true },
      where: { EmpleadoID: Number(tokenDecifrado.empleadoId) },
    });

    // verificando si el token es antiguo (se cambio clave) o si si existe en la DB
    if (
      !empleado ||
      empleado.VersionToken !== Number(tokenDecifrado.versionToken)
    ) {
      // eliminando todos sus tokens ya que se cambio clave
      res.clearCookie(TOKEN.ACCESO, tokenAccesoCookieOpciones);
      res.clearCookie(TOKEN.REFRESCO, tokenRefrescoCookieOpciones);

      // no hay necesidad de invalidar en DB porque al cambiar calve, se invalida.

      return res.status(401).json({
        error: true,
        mensaje: "La clave se ha cambiado, inicie sesion con la nueva clave!",
      });
    }

    req.JWTpayload = tokenDecifrado;

    next();
  } catch (e) {
    next(e);
  }
};
