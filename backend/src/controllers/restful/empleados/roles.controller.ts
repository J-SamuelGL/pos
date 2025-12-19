import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { tryCatch } from "../../../middlewares/error.middleware.js";

const prisma = new PrismaClient().roles;

export const verRoles = tryCatch(async (req: Request, res: Response) => {
  const roles = await prisma.findMany({
    where: {
      RolID: {
        not: 1,
      },
    },
  });
  return res.status(200).json({ mensaje: "Roles conseguidos!", objeto: roles });
});
