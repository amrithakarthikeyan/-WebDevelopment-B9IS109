import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface HealthResponse {
  status: string;
  message: string;
}

export const useHealth = () => {
  return useQuery<HealthResponse, Error>({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await api.get<HealthResponse>("/health");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};
