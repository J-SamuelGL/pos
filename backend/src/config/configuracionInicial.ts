import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
import { roles } from "../seed/empleados/roles.js";
import { empleados } from "../seed/empleados/empleados.js";

const prisma = new PrismaClient();

const configuracionInicial = async () => {
  try {
    const usuario = await prisma.empleados.findFirst();
    if (!usuario) {
      // chequear si las variables de configuracion inicial existen
      if (!process.env.NOMBRES || !process.env.ROLID) {
        console.log("⚠️ El admin no está configurado en el .env!");
        return;
      }
      console.log("⌛ Insertando seed...");
      // crear los roles
      await prisma.roles.createMany({
        data: roles,
      });

      // super admin
      // encriptando clave
      const claveEncriptada = await bcrypt.hash(process.env.CLAVE, 10);
      // crear al super admin
      await prisma.empleados.create({
        data: {
          RolID: Number(process.env.ROLID),
          Nombres: process.env.NOMBRES,
          Apellidos: process.env.APELLIDOS,
          Usuario: process.env.USUARIO,
          Clave: claveEncriptada,
          FechaCreacion: new Date(),
          Imagen: "foto-mia.png",
          Celular: "13049384",
          FechaContratado: new Date(),
          FechaFinLabores: null,
          FechaNacimiento: new Date(),
          Genero: "Hombre",
          Salario: new Prisma.Decimal(1000),
        },
      });

      // empleados
      await prisma.empleados.createMany({
        data: empleados,
      });

      console.log("✅ Configuración terminada!");
    }
    return;
  } catch (e) {
    console.error(e);
  }
};

export default configuracionInicial;
