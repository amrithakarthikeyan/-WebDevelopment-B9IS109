import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Asset } from "./useAssets";

interface UpdateAssetInput {
  id: string;
  updates: Partial<Asset>;
}

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateAssetInput) => {
      const res = await api.put<Asset>(`/assets/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};
