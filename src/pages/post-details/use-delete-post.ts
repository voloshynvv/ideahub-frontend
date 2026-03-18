import { deletePost, postQueries } from "@/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
