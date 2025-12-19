import { ROLES } from "../../types/autentificacion.js";
import type { roles as Roles } from "@prisma/client";

export const roles: Roles[] = [
  {
    RolID: 1,
    Nombre: ROLES.SUPER,
    Descripcion: "Puede acceder a todos los módulos del sistema.",
  },
  {
    RolID: 2,
    Nombre: ROLES.GERE,
    Descripcion:
      "Puede acceder a todos los módulos del sistema de la sucursal a su cargo.",
  },
  {
    RolID: 3,
    Nombre: ROLES.CAJA,
    Descripcion: "Puede acceder a los módulos de ventas y clientes.",
  },
  {
    RolID: 4,
    Nombre: ROLES.BODE,
    Descripcion: "Puede acceder a los módulos de inventario y compras.",
  },
];
