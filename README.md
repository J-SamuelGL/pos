
# POS

Sistema POS full-stack con funcionalidad de inventario, autentificación y acceso por roles; hecho con React y Express.

## Funcionalidades principales

### Dashboard general

Muestra información sobre el desempeño financiero. Todos los datos mostrados corresponden con el mes y año actual.

![dashboard](/capturas/dashboard.png)

### Registro de ventas

Lista todos los productos y sus datos importantes junto con sus respectivas presentaciones (mayoreo) y existencias.

![modulo caja](/capturas/caja/caja.png)

Al agregar un producto, tanto individual como al mayoreo, el sistema se asegurará de que no se exceda de las existencias.

![modal de productos](/capturas/caja/agregando-al-carrito.png)

Al finalizar la venta, el cajero deberá ingresar el monto recibido y los datos del cliente.

![modal de datos finales de la venta](/capturas/caja/finalizar-venta.png)

El historia de transacciones es visible tanto para compras como para ventas. Al clicar sobre una venta específica, se mostrará un modal con los detalles de la transacción.

![historial](/capturas/historial.png)

### Módulo de inventario

En el módulo de inventario, el bodeguero puede: crear nuevos productos y paquetes, realizar compras y crear proveedores. El registro de compra es igual que el de ventas, al clicar sobre un producto aparecerá un modal para ingresar la cantidad y al finalizar, se actualizarán la existencia de los productos comprados.

![modulo compras](/capturas/compras.png)

### Autentificación y autorización

El gerente es el encargado de crear usuario y asignar roles. Todos los usuarios necesitan iniciar sesión para acceder al sistema.

|               | Home | Caja | Inventario |
|---------------|------|------|------------|
| **Gerente**   | ✅    | ✅    | ✅          |
| **Cajero**    | ❌    | ✅    | ❌          |
| **Bodeguero** | ❌    | ❌    | ✅          |


## Tecnologías

### Frontend

* **Lenguaje:** Typescript
* **Framework:** React
* **Framework de estilos:** Tailwindcss
* **Validación de esquemas:** Zod
* **Cache:** Tanstack query
* **Router:** Tanstack router
* **Formularios:** Tanstack form

### Backend

* **Lenguaje:** Typescript
* **Framework:** Express
* **ORM:** Prisma
* **Autentificación:** JWT
* **Validador de esquemas:** Zod

### BD

La base de datos se creó utilizando MySQL. Las tablas se explican a continuación:

![esquema](/capturas/esquema.png)

| Tabla                 | Descripción                                                                                                                                                  |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Empleados`           | Contiene la información laboral y personal de todos los empleados. En esta tabla también se incluyen las credenciales del usuario; la clave está encriptada. |
| `Sesiones`            | Almacena datos útiles para controlar el acceso a la aplicación.                                                                                              |
| `Roles`               | Describe y enlista los roles del sistema.                                                                                                                    |
| `Productos`           | Lista información esencial sobre cada producto. La columna `Cantidad` lleva el el inventario del producto.                                                   |
| `Paquetes`            | Representa los productos al mayoreo. Este es la **_entrada_** ya que actualiza la `Cantidad` disponible de cada producto.                                    |
| `ProveedoresPaquetes` | Es una tabla de unión que indica los distintos precios a los que los proveedores ofrecen el mismo producto.                                                  |
| `Proveedores`         | Guarda información de contacto sobre los proveedores.                                                                                                        |
| `Compras`             | En esta tabla se guardan todos los registros de las notas de compras.                                                                                        |
| `DetallesCompras`     | Contiene la información del detalle de cada compra.                                                                                                          |
| `Ventas`              | Guarda las notas de ventas hechas.                                                                                                                           |
| `DetallesVenta`       | Muestra los detalles de una venta incluyendo la utilidad de cada ítem.                                                                                       |
| `Clientes`            | Guarda información básica de los clientes.                                                                                                                   |
