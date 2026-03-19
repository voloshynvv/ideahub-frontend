import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, postQueries } from "@/features/posts/shared/queries";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });
};
