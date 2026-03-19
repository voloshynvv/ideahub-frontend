import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueries, updatePost } from "@/features/posts/shared/queries";

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
