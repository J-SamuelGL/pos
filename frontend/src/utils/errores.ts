import { AxiosError } from "axios";
import type { APIRespuesta } from "./globales";
import { z } from "zod";

type APIAxiosError = AxiosError<APIRespuesta>;

export const getError = (error: unknown) => {
  console.log(error);
  if (error instanceof AxiosError) {
    if (error.response) {
      const mensajeAPI = error as APIAxiosError;
      throw new Error(mensajeAPI.response?.data.mensaje);
    }
    throw new Error(error.message);
  }
  if (error instanceof z.ZodError) {
    throw new Error("El objeto no es de la forma esperada...");
  }
  throw new Error("Algo salió mal");
};
