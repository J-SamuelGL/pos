import { ROLES, type payloadTokenAcceso } from "./autentificacion.js";
// * JWT Payload
declare global {
  namespace Express {
    interface Request {
      JWTpayload?: payloadTokenAcceso;
    }
  }
}

// * ENV
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CADENA_CONEXION: string;
      TOKEN_ACCESO_CLAVE: string;
      TOKEN_REFRESCO_CLAVE: string;
      ROLID: string;
      NOMBRES: string;
      APELLIDOS: string;
      USUARIO: string;
      CLAVE: string;
    }
  }
}

export {};
