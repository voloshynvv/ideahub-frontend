import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, postQueries } from "@/features/posts/shared/queries";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueries.lists(),
      });
    },
  });
};
