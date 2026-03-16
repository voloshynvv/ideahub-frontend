import { apiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import type { Post } from "./models";

const getPosts = async (queryTerm?: string) => {
  const response = await apiClient.get<Post[]>("/posts", {
    params: {
      q: queryTerm || undefined,
    },
  });
  return response.data;
};

const getPost = async (id: string) => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const postQueries = {
  all: () => ["posts"],
  list: (queryTerm: Parameters<typeof getPosts>[0]) =>
    queryOptions({
      queryKey: [...postQueries.all(), "list", { queryTerm }],
      queryFn: () => getPosts(queryTerm),
    }),
  details: (id: string) =>
    queryOptions({
      queryKey: [...postQueries.all(), "details", id],
      queryFn: () => getPost(id),
    }),
};
