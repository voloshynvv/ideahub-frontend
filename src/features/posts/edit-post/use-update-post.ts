import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postQueries,
  resetInfiniteQueryPagination,
  updatePost,
} from "@/features/posts/shared/queries";

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      resetInfiniteQueryPagination(queryClient);

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: postQueries.lists(),
        }),
        queryClient.invalidateQueries(postQueries.details(postId)),
      ]);
    },
  });
};
