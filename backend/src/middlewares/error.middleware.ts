import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import assert from "node:assert";
import { z } from "zod";

// error personalizado
export class ErrorApp extends Error {
  constructor(public statusHTTP: number, public mensaje: string) {
    super(mensaje);
  }
}

// assert (chequear si es null)
type TChequearNull = (
  condicion: any,
  statusHTTP: number,
  mensaje: string
) => asserts condicion;
export const chequearNull: TChequearNull = (condicion, statusHTTP, mensaje) =>
  assert(condicion, new ErrorApp(statusHTTP, mensaje));

// envoltorio try catch
type TRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
export const tryCatch =
  (controlador: TRequest) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controlador(req, res, next);
    } catch (e) {
      next(e);
    }
  };

// manejador de errores
export const manejadorError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // errores personalizados
  if (err instanceof ErrorApp) {
    return res.status(err.statusHTTP).json({ mensaje: err.mensaje });
  }

  // errores zod
  if (err instanceof z.ZodError) {
    return res.status(400).json({ errores: err.issues });
  }

  // JWT errores
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      error: true,
      mensaje: "Su sesión ha expirado. Inicie sesión nuevamente.",
    });
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(403).json({
      error: true,
      mensaje: "Token inválido.",
    });
  }

  // Errores de prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          error: true,
          mensaje: "Ya existe un registro con esos datos únicos.",
        });
      case "P2025":
        return res.status(404).json({
          error: true,
          mensaje:
            "No se pudo actualizar porque no existe en la base de datos!",
        });
      case "P2003":
        return res.status(400).json({
          error: true,
          mensaje: "Error de referencia en la base de datos.",
        });
      case "P2014":
        return res.status(400).json({
          error: true,
          mensaje: "Los datos proporcionados violan una restricción.",
        });
    }
  }

  // Error general
  console.error(err.stack);
  res.status(500).json({
    error: true,
    mensaje: "Hubo un error en el servidor!",
  });
};
