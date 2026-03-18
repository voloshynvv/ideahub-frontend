import { postQueries, updatePost } from "@/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });
};
