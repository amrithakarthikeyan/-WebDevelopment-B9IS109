import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Asset } from "./useAssets";

export type CreateAssetInput = Omit<Asset, "id">;

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAssetInput) => {
      const res = await api.post<Asset>("/assets", payload);
      return res.data;
    },
    onSuccess: () => {
      // Refetch assets list after creating a new one
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};
