// * mostrarEmpleados
// es GET
export interface empleadoMostrarEmpleados {
  EmpleadoID: string;
  Nombres: string;
  Apellidos: string;
  Usuario: string;
  roles: { Nombre: string };
  Salario: string;
  Celular: string | null;
  Genero: string;
  FechaNacimiento: Date | null;
  FechaContratado: Date;
  FechaFinLabores: Date | null;
}

export interface mostrarEmpleadosRespuesta {
  error: boolean;
  empleados: empleadoMostrarEmpleados[] | [];
}

// * crearEmpleado
export interface crearEmpleadoSolicitud {
  RolID: number;
  Nombres: string;
  Apellidos: string;
  Usuario: string;
  Clave: string;
}

// mensaje generico

// * buscarEmpleado
export interface empleadoBuscarEmpleado {
  EmpleadoID: number;
  Nombres: string;
  Apellidos: string;
  Usuario: string;
  FechaCreacion: Date;
  Imagen: string | null;
  RolID: number;
  roles: {
    Nombre: string;
    Descripcion: string;
  };
  Salario: string;
  Celular: string | null;
  Genero: string;
  FechaNacimiento: Date | null;
  FechaContratado: Date;
  FechaFinLabores: Date | null;
}

export type buscarEmpleadoSolicitud = string;

export interface buscarEmpleadoRespuesta {
  error: boolean;
  empleado: empleadoBuscarEmpleado;
}

// * actualizarEmpleado
export interface actualizarEmpleadoSolicitud {
  id: string;
  RolID?: string;
  Nombres?: string;
  Apellidos?: string;
  Usuario?: string;
}

export type verRolesRespuesta = {
  RolID: number;
  Nombre: string;
  Descripcion: string;
};
