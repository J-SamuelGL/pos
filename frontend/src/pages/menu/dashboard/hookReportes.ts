import { getReportes } from "./apiReportes";
import { useQuery } from "@tanstack/react-query";

export const useReportes = () => {
  return useQuery({
    queryFn: () => getReportes(),
    queryKey: ["reportes"],
  });
};
