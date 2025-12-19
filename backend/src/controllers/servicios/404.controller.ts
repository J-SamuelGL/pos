import { Response, Request } from "express";

const manejador404 = (req: Request, res: Response) => {
  res.status(404).json({ error: true, mensaje: "Ese endpoint no existe!" });
};

export default manejador404;
