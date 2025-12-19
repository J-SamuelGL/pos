import { CorsOptions } from "cors";

const origenesPermitidos = [
  "http://localhost:5173",
  "https://samuelgarcia.site",
  "http://localhost:3000",
  "https://frontend.redground-8db0c454.eastus2.azurecontainerapps.io",
];

export const opcionesCors: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (origenesPermitidos.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(
        new Error(
          "El origen (URL, dominio) no tiene permiso para acceder a esta API!" +
            "origen: " +
            origin
        )
      );
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
