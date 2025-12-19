import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  type payloadTokenAcceso,
  TOKEN,
  ROLES,
  type payloadTokenRefresco,
} from "../../types/autentificacion.js";
import {
  tokenAccesoCookieOpciones,
  tokenRefrescoCookieOpciones,
  tokenAccesoJWTOpciones,
  tokenRefrescoJWTOpciones,
} from "../../config/configuracionCredenciales.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tryCatch, chequearNull } from "../../middlewares/error.middleware.js";
import { SLogeo, SActualizarClave } from "../../schemas/login/login.schema.js";

const prisma = new PrismaClient();

export const logeo = tryCatch(async (req: Request, res: Response) => {
  // obteniendo parametros
  const { Usuario, Clave } = SLogeo.parse(req.body);

  // buscando usuario
  const usuarioEncontrado = await prisma.empleados.findUnique({
    select: {
      EmpleadoID: true,
      Nombres: true,
      Apellidos: true,
      Usuario: true,
      VersionToken: true,
      Clave: true,
      roles: {
        select: {
          Nombre: true,
        },
      },
    },
    where: {
      Usuario,
    },
  });
  chequearNull(usuarioEncontrado, 404, "El usuario que ingresó no existe!");

  // comprobando clave
  const claveCorrecta = await bcrypt.compare(Clave, usuarioEncontrado.Clave);
  chequearNull(claveCorrecta, 400, "La clave que ingresó es incorrecta!");

  // JWTPayloads
  const payloadTokenAcceso: payloadTokenAcceso = {
    empleadoId: String(usuarioEncontrado.EmpleadoID),
    versionToken: String(usuarioEncontrado.VersionToken),
    rol: usuarioEncontrado.roles.Nombre as ROLES,
  };

  const payloadTokenRefresco: payloadTokenRefresco = {
    empleadoId: String(usuarioEncontrado.EmpleadoID),
    versionToken: String(usuarioEncontrado.VersionToken),
  };

  // creando JWT
  const tokenAcceso = jwt.sign(
    payloadTokenAcceso,
    process.env.TOKEN_ACCESO_CLAVE,
    tokenAccesoJWTOpciones
  );
  const tokenRefresco = jwt.sign(
    payloadTokenRefresco,
    process.env.TOKEN_REFRESCO_CLAVE,
    tokenRefrescoJWTOpciones
  );

  // encriptando token refresco
  // const tokenRefrescoEncriptado = crypto
  //   .createHash("sha256")
  //   .update(tokenRefresco)
  //   .digest("hex");

  // creando sesion en DB
  await prisma.sesiones.create({
    data: {
      EmpleadoID: usuarioEncontrado.EmpleadoID,
      TokenRefresco: tokenRefresco,
      FechaCreacion: new Date(),
      FechaExpiracion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      Plataforma: req.headers["user-agent"] || "Desconocido",
    },
  });

  // guardando tokens en cookie HTTP only
  // ! secure: true en produccion
  res.cookie(TOKEN.REFRESCO, tokenRefresco, tokenRefrescoCookieOpciones);
  res.cookie(TOKEN.ACCESO, tokenAcceso, tokenAccesoCookieOpciones);

  const empleado = {
    EmpleadoID: usuarioEncontrado.EmpleadoID,
    Nombres: usuarioEncontrado.Nombres,
    Apellidos: usuarioEncontrado.Apellidos,
    Usuario: usuarioEncontrado.Usuario,
    roles: {
      Nombre: usuarioEncontrado.roles.Nombre,
    },
  };

  return res.status(200).json({
    mensaje: "Logeado exitosamente!",
    objeto: empleado,
  });
});

export const actualizarClave = tryCatch(async (req: Request, res: Response) => {
  // obteniendo parametros
  const { Clave } = SActualizarClave.parse(req.body);

  // encriptando clave
  const nuevaClave = await bcrypt.hash(Clave, 10);

  // transaccion
  await prisma.$transaction(async (tx) => {
    // reseteando clave
    await tx.empleados.update({
      where: {
        EmpleadoID: Number(req.JWTpayload?.empleadoId),
      },
      data: {
        Clave: nuevaClave,
        VersionToken: { increment: 1 },
      },
    });

    // invalidando el resto de sesiones
    await tx.sesiones.updateMany({
      where: {
        EmpleadoID: Number(req.JWTpayload?.empleadoId),
        Activo: 1,
      },
      data: {
        Activo: 0,
      },
    });
  });

  // cerrando sesion
  // eliminando todas las cookies
  res.clearCookie(TOKEN.ACCESO, tokenAccesoCookieOpciones);
  res.clearCookie(TOKEN.REFRESCO, tokenRefrescoCookieOpciones);

  return res.status(200).json({ mensaje: "Clave actualizada!" });
});

export const anularTokens = tryCatch(async (req: Request, res: Response) => {
  // obteniendo token de refresco
  const tokenRefresco = req.cookies[TOKEN.REFRESCO];

  // verificando que no se hay alterado
  jwt.verify(tokenRefresco, process.env.TOKEN_REFRESCO_CLAVE);

  // encriptando token para compararlo con el encriptado en la DB
  // const tokenRefrescoEncriptado = crypto
  //   .createHash("sha256")
  //   .update(tokenRefresco)
  //   .digest("hex");

  // buscando el token de refresco para cancelarlo
  await prisma.sesiones.update({
    where: { TokenRefresco: tokenRefresco },
    data: { Activo: 0 },
  });

  // eliminando todos sus tokens
  res.clearCookie(TOKEN.ACCESO, tokenAccesoCookieOpciones);
  res.clearCookie(TOKEN.REFRESCO, tokenRefrescoCookieOpciones);

  return res.status(200).json({
    mensaje: "Se ha cerrado sesión en este dispositivo!",
  });
});

export const refrescarTokenAcceso = tryCatch(
  async (req: Request, res: Response) => {
    // obteniendo token
    chequearNull(req.cookies[TOKEN.REFRESCO], 401, "No hay token!");
    const tokenRefresco = await req.cookies[TOKEN.REFRESCO];

    // encriptando para que sea igual al de la DB
    // const tokenRefrescoEncriptado = crypto
    //   .createHash("sha256")
    //   .update(tokenRefresco)
    //   .digest("hex");
    // console.log(tokenRefrescoEncriptado);

    // verificando que no haya sido alterado
    const tokenRefrescoDecodificado = jwt.verify(
      tokenRefresco,
      process.env.TOKEN_REFRESCO_CLAVE
    ) as payloadTokenRefresco;

    // buscando sesion
    const sesion = await prisma.sesiones.findFirst({
      where: { TokenRefresco: tokenRefresco, Activo: 1 },
    });

    if (!sesion) {
      // eliminando cookie vieja
      res.clearCookie(TOKEN.REFRESCO, tokenRefrescoCookieOpciones);
      return res.status(401).json({
        mensaje: "Sesión inválida. Inicie sesión nuevamente!",
      });
    }

    // buscando datos del usuario
    const usuarioEncontrado = await prisma.empleados.findUnique({
      select: {
        EmpleadoID: true,
        VersionToken: true,
        roles: {
          select: {
            Nombre: true,
          },
        },
      },
      where: {
        EmpleadoID: Number(tokenRefrescoDecodificado.empleadoId),
      },
    });
    chequearNull(usuarioEncontrado, 404, "El usuario no existe!");

    const payloadTokenAcceso: payloadTokenAcceso = {
      empleadoId: String(usuarioEncontrado.EmpleadoID),
      versionToken: String(usuarioEncontrado.VersionToken),
      rol: usuarioEncontrado.roles.Nombre as ROLES,
    };

    // creando nuevo token de acceso
    const tokenAcceso = jwt.sign(
      payloadTokenAcceso,
      process.env.TOKEN_ACCESO_CLAVE,
      tokenAccesoJWTOpciones
    );

    // guardando nuevo token acceso en cookie HTTP only
    // ! secure: true en produccion
    res.cookie(TOKEN.ACCESO, tokenAcceso, tokenAccesoCookieOpciones);

    return res.status(200).json({
      mensaje: "Se refresco el token de acceso!",
    });
  }
);
