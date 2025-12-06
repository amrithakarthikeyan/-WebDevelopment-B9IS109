import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

interface DeleteAssetInput {
  id: string;
}

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteAssetInput) => {
      await api.delete(`/assets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};
