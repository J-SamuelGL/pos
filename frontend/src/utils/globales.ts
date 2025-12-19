export interface APIRespuestaObjeto<T> {
  mensaje: string;
  objeto: T;
}

export interface APIRespuestaSimple {
  mensaje: string;
}

export const RUTAS = {
  AUTH: "/autentificacion",
  AUTH_RFS: "/autentificacion/refrescar",
  EMPL: "/empleados",
  EMPL_BSR: "/empleados/buscar/",
  IDEN: "/identificacion",
  SUBCAT: "/subcategorias",
  PRODC: "/productos",
  PRODC_BSR: "/productos/buscar/",
  PAQ: "/paquetes",
  PAQ_BSR: "/paquetes/buscar/",
  VENT: "/ventas",
  VENT_BSR: "/ventas/buscar/",
  COMP: "/compras",
  COMP_BSR: "/compras/buscar/",
  ROLS: "/roles",
  REP: "/reportes",
  PROV: "/proveedores",
  PROV_BSR: "/proveedores/buscar/",
  CLI: "/clientes",
  CLI_BSR: "/clientes/buscar/",
} as const;

export const ROLES = {
  SUPER: "Gerente general",
  GERE: "Gerente",
  CAJA: "Cajero",
  BODE: "Bodeguero",
} as const;

export type id = number | null | string;
