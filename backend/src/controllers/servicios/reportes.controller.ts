import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch, chequearNull } from "../../middlewares/error.middleware.js";

const prisma = new PrismaClient();

export const getReportes = tryCatch(async (req: Request, res: Response) => {
  // validacion
  chequearNull(req.body.year, 400, "No proporciono que año!");
  const { year } = req.body;

  const ventasHoy = await prisma.$queryRaw`
    SELECT
      SUM(Total) AS Total
    FROM
      ventas
    WHERE
      DATE(FechaHora) = CURDATE();
`;

  const balance = await prisma.$queryRaw`
    (
      SELECT 
        'Ventas' AS Nombre,
        SUM(Total) AS Total
      FROM 
        ventas
      )
  UNION
    (
      SELECT 
        'Compras' AS Nombre,
        SUM(Total) AS Total
      FROM 
        compras
    );
`;

  const gananciaMes = await prisma.$queryRaw`
    SELECT 
      TotalVentas - TotalCompras AS Ganancia
    FROM 
      (
        SELECT 
          1 AS ID,
          SUM(Total) AS TotalVentas
        FROM 
          ventas
        ) AS VentasMes
    INNER JOIN
      (
        SELECT 
          1 AS ID,
          SUM(Total) AS TotalCompras
        FROM 
          compras
        ) AS ComprasMes
    ON 
      VentasMes.ID = ComprasMes.ID;
`;

  const top10Productos = await prisma.$queryRaw`
    SELECT 
      p.Nombre,
      SUM(tuv.TotalComprado) AS TotalUnidadesVendidas
    FROM
      (
      -- total unidades vendidas por producto
        SELECT 
          CASE 
            WHEN dv.ProductoID IS NULL THEN pa.ProductoID
            ELSE dv.ProductoID
          END AS ProductoID,
          CASE 
            WHEN dv.ProductoID IS NULL THEN dv.Cantidad * pa.UnidadesTotales
            ELSE dv.Cantidad
          END AS TotalComprado
        FROM 
          detallesventa dv
          LEFT JOIN paquetes pa ON pa.PaqueteID = dv.PaqueteID
          LEFT JOIN productos pr ON pr.ProductoID = dv.ProductoID
      ) AS tuv
    INNER JOIN 
      productos p ON p.ProductoID = tuv.ProductoID
    GROUP BY 
      tuv.ProductoID
    ORDER BY 
      SUM(tuv.TotalComprado) DESC
    LIMIT 10;
`;

  const ventasPorMes = await prisma.$queryRaw`
    SELECT
      CASE Mes
        WHEN 1 THEN 'Enero'
            WHEN 2 THEN 'Febrero'
            WHEN 3 THEN 'Marzo'
            WHEN 4 THEN 'Abril'
            WHEN 5 THEN 'Mayo'
            WHEN 6 THEN 'Junio'
            WHEN 7 THEN 'Julio'
            WHEN 8 THEN 'Agosto'
            WHEN 9 THEN 'Septiembre'
            WHEN 10 THEN 'Octubre'
            WHEN 11 THEN 'Noviembre'
            WHEN 12 THEN 'Diciembre'
        END AS Mes,
        TotalVentas AS Total
    FROM 
      (
        -- ventas por mes
        SELECT 
          MONTH(FechaHora) AS Mes,
          SUM(Total) AS TotalVentas
        FROM 
          ventas
        GROUP BY 
          MONTH(FechaHora)
        ORDER BY
          MONTH(FechaHora) ASC
        ) AS vpm;
`;

  return res.status(200).json({
    mensaje: "Ventas obtenidas!",
    objeto: {
      ventasHoy,
      balance,
      gananciaMes,
      top10Productos,
      ventasPorMes,
    },
  });
});
