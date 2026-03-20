import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Reaction } from "@/types/model";
import { apiClient } from "@/lib/api-client";
import { postQueries } from "@/features/posts/shared/queries";

export const useAddReaction = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await apiClient.put(`/posts/${postId}/reactions`, {
        name,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });
};

export const useRemoveReaction = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await apiClient.delete(
        `/posts/${postId}/reactions/${name}`,
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });
};

export const useToggleReaction = (postId: string) => {
  const addReaction = useAddReaction(postId);
  const removeReaction = useRemoveReaction(postId);

  const toggle = (reaction: Pick<Reaction, "name" | "hasReacted">) => {
    if (reaction.hasReacted) {
      removeReaction.mutate(reaction.name);
    } else {
      addReaction.mutate(reaction.name);
    }
  };

  const isPending = (name: Reaction["name"]) => {
    return (
      (addReaction.isPending && addReaction.variables === name) ||
      (removeReaction.isPending && removeReaction.variables === name)
    );
  };

  const isAnyPending = addReaction.isPending || removeReaction.isPending;

  return {
    toggle,
    isPending,
    isAnyPending,
  };
};
