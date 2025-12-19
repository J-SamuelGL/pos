(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import express from "express";
import cookieParser from "cookie-parser";
import manejador404 from "./controllers/servicios/404.controller.js";
import configuracionInicial from "./config/configuracionInicial.js";

// CORS
import cors from "cors";
import { opcionesCors } from "./config/configuracionCors.js";

// middleware
import { manejadorError } from "./middlewares/error.middleware.js";
import { verificadorJWT } from "./middlewares/verificarJWT.middelware.js";
import verificarRoles from "./middlewares/verificarPermisos.middleware.js";
import { ROLES } from "./types/autentificacion.js";

// rutas
import empleadosRouter from "./routes/restful/empleados/empleados.routes.js";
import autentificacionRouter from "./routes/servicios/autentifacion.routes.js";
import identificacionRouter from "./routes/servicios/identificacion.route.js";
import productosRouter from "./routes/restful/productos/productos.routes.js";
import paquetesRouter from "./routes/restful/inventario/paquetes.routes.js";
import ventasRouter from "./routes/restful/ventas/ventas.routes.js";
import rolesRouter from "./routes/restful/empleados/roles.routes.js";
import comprasRouter from "./routes/restful/inventario/compras.routes.js";
import reportesRouter from "./routes/servicios/reportes.routes.js";
import proveedoresRouter from "./routes/restful/proveedores/proveedores.route.js";
import clientesRouter from "./routes/restful/clientes/clientes.routes.js";
import tarjetasRouter from "./routes/restful/tarjetas/tarjetas.routes.js";

const app = express();

// imagenes
app.use("/uploads", express.static("uploads"));

app.use(cors(opcionesCors));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* // ! AL CREAR LAS COOKIES, TIENEN QUE TENER LA OPCION SECURE
! (HTTPS) PARA PRODUCCION */
app.use(cookieParser());

// JWT
app.use("/api/autentificacion", autentificacionRouter);

// Rutas seguras
app.use(verificadorJWT);

app.use(
  "/api/empleados",
  verificarRoles([ROLES.GERE, ROLES.SUPER]),
  empleadosRouter
);

app.use("/api/productos", productosRouter);
app.use("/api/identificacion", identificacionRouter);
app.use("/api/paquetes", paquetesRouter);
app.use("/api/ventas", ventasRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/compras", comprasRouter);
app.use("/api/proveedores", proveedoresRouter);
app.use("/api/reportes", reportesRouter);
app.use("/api/clientes", clientesRouter);
app.use(
  "/api/tarjetas",
  verificarRoles([ROLES.GERE, ROLES.SUPER, ROLES.CAJA]),
  tarjetasRouter
);

// debug
app.use(manejador404);
app.use(manejadorError);

app.listen(3000, async () => {
  await configuracionInicial();
  console.log("📡 http://localhost:3000/api");
});
