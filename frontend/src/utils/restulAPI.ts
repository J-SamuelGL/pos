import API from "axios";
import { RUTAS } from "./globales";
import { useQuery } from "@tanstack/react-query";

export const get = (recurso: string) => {
  return useQuery({
    queryKey: [],
  });
};
