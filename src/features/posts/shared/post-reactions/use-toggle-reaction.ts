import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { Post, Reaction } from "@/types/model";
import { apiClient } from "@/lib/api-client";
import { postQueries } from "@/features/posts/shared/queries";
import { useSearch } from "@tanstack/react-router";

const applyReaction = (
  post: Post,
  { name, hasReacted }: Pick<Reaction, "name" | "hasReacted">,
): Post => {
  if (hasReacted) {
    return {
      ...post,
      reactions: post.reactions
        .map((r) =>
          r.name === name ? { ...r, count: r.count - 1, hasReacted: false } : r,
        )
        .filter((r) => r.count > 0),
    };
  }

  const existing = post.reactions.find((r) => r.name === name);

  return {
    ...post,
    reactions: existing
      ? post.reactions.map((r) =>
          r.name === name ? { ...r, count: r.count + 1, hasReacted: true } : r,
        )
      : [...post.reactions, { name, count: 1, hasReacted: true }],
  };
};

export const useToggleReaction = (postId: string) => {
  const queryClient = useQueryClient();
  const { q } = useSearch({ strict: false });
  const queryTerm = q ?? "";

  const { mutate } = useMutation({
    mutationFn: async ({
      name,
      hasReacted,
    }: Pick<Reaction, "name" | "hasReacted">) => {
      const response = hasReacted
        ? await apiClient.delete(`/posts/${postId}/reactions/${name}`)
        : await apiClient.put(`/posts/${postId}/reactions`, { name });
      return response.data;
    },
    onMutate: async ({ name, hasReacted }) => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: postQueries.all() });

      // snapshot the previous values
      const prevPosts = queryClient.getQueryData<InfiniteData<Post[]>>(
        postQueries.list({ queryTerm }).queryKey,
      );
      const prevPost = queryClient.getQueryData<Post>(
        postQueries.details(postId).queryKey,
      );

      // optimistically update to the new value
      queryClient.setQueryData<InfiniteData<Post[]>>(
        postQueries.list({ queryTerm }).queryKey,
        (data) => {
          if (!data?.pages) return data;

          return {
            ...data,
            pages: data.pages.map((page) =>
              page.map((post) =>
                post.id !== postId
                  ? post
                  : applyReaction(post, { name, hasReacted }),
              ),
            ),
          };
        },
      );

      queryClient.setQueryData(postQueries.details(postId).queryKey, (data) => {
        if (!data) return data;
        return applyReaction(data, { name, hasReacted });
      });

      return { prevPost, prevPosts };
    },
    // rollback to the previous value
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        postQueries.details(postId).queryKey,
        context?.prevPost,
      );
      queryClient.setQueryData(
        postQueries.list({ queryTerm }).queryKey,
        context?.prevPosts,
      );
    },
    // refetch
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: postQueries.all() }),
  });

  return { toggle: mutate };
};
