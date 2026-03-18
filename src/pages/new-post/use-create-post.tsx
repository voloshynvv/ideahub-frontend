import { createPost, postQueries } from "@/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
