import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export type AssetStatus = "IN_STOCK" | "ASSIGNED" | "MAINTENANCE" | "RETIRED";

export interface Asset {
  id: string;
  tag: string;
  type: string;
  brand?: string;
  model?: string;
  status: AssetStatus;
  assignedTo?: string | null;
  purchaseDate?: string;
}

export const useAssets = () => {
  return useQuery<Asset[], Error>({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await api.get<Asset[]>("/assets");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
};
