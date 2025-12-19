export enum ROLES {
  SUPER = "Gerente general",
  GERE = "Gerente",
  CAJA = "Cajero",
  BODE = "Bodeguero",
}

export enum TOKEN {
  ACCESO = "tokenAcceso",
  REFRESCO = "tokenRefresco",
}

export interface payloadTokenRefresco {
  empleadoId: string;
  versionToken: string;
}
export interface payloadTokenAcceso {
  empleadoId: string;
  versionToken: string;
  rol: ROLES;
}
