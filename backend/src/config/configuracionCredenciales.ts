import { CookieOptions } from "express";

export const tokenAccesoCookieOpciones: CookieOptions = {
  httpOnly: true,
  // 15 minutos
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "produccion" ? "none" : ("lax" as const),
  secure: process.env.NODE_ENV === "produccion",
};

export const tokenRefrescoCookieOpciones: CookieOptions = {
  httpOnly: true,
  // 30 dias
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "produccion" ? "none" : ("lax" as const),
  secure: process.env.NODE_ENV === "produccion",
};

export const tokenAccesoJWTOpciones = {
  expiresIn: 30 * 24 * 60 * 60 * 1000, // 15 minutos
} as const;

export const tokenRefrescoJWTOpciones = {
  expiresIn: "30d",
} as const;
