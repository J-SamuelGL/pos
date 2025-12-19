import { type empleados as Empleados, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const empleadosRaw: Omit<Empleados, "EmpleadoID" | "VersionToken">[] = [
  {
    RolID: 2,
    Nombres: "José Luis",
    Apellidos: "García López",
    Usuario: "JLuis",
    Clave: "test123",
    FechaCreacion: new Date(),
    Imagen: "usuario-default.png",
    Celular: "23049384",
    FechaContratado: new Date(),
    FechaFinLabores: null,
    FechaNacimiento: new Date(),
    Genero: "Hombre",
    Salario: new Prisma.Decimal(1000),
  },
  {
    RolID: 3,
    Nombres: "Rony Efraín",
    Apellidos: "Mejía Santos",
    Usuario: "REfrain",
    Clave: "test123",
    FechaCreacion: new Date(),
    Imagen: "usuario-default.png",
    Celular: "33049384",
    FechaContratado: new Date(),
    FechaFinLabores: null,
    FechaNacimiento: new Date(),
    Genero: "Hombre",
    Salario: new Prisma.Decimal(1000),
  },
  {
    RolID: 3,
    Nombres: "David Raúl",
    Apellidos: "García Mayorga",
    Usuario: "DRaul",
    Clave: "test123",
    FechaCreacion: new Date(),
    Imagen: "usuario-default.png",
    Celular: "43049384",
    FechaContratado: new Date(),
    FechaFinLabores: null,
    FechaNacimiento: new Date(),
    Genero: "Hombre",
    Salario: new Prisma.Decimal(1000),
  },
  {
    RolID: 4,
    Nombres: "Emerson Higinio",
    Apellidos: "Villatoro Cayax",
    Usuario: "EHiginio",
    Clave: "test123",
    FechaCreacion: new Date(),
    Imagen: "usuario-default.png",
    Celular: "53049384",
    FechaContratado: new Date(),
    FechaFinLabores: null,
    FechaNacimiento: new Date(),
    Genero: "Hombre",
    Salario: new Prisma.Decimal(1000),
  },
];

const hashClaves = async () => {
  const empleados: Omit<Empleados, "EmpleadoID" | "VersionToken">[] = [];

  for (const empleado of empleadosRaw) {
    const hashedPassword = await bcrypt.hash(empleado.Clave, 10);

    empleados.push({
      ...empleado,
      Clave: hashedPassword,
    });
  }

  return empleados;
};

export const getEmpleadosWithHashedPasswords = hashClaves;

export const empleados = await hashClaves();
