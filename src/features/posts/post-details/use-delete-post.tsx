import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePost,
  postQueries,
  resetInfiniteQueryPagination,
} from "@/features/posts/shared/queries";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      resetInfiniteQueryPagination(queryClient);

      await queryClient.refetchQueries({
        queryKey: postQueries.lists(),
      });
    },
  });
};
