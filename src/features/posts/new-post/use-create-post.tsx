import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  postQueries,
  resetInfiniteQueryPagination,
} from "@/features/posts/shared/queries";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      resetInfiniteQueryPagination(queryClient);
      await queryClient.refetchQueries({
        queryKey: postQueries.lists(),
      });
    },
  });
};
