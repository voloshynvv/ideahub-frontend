import { apiClient } from "@/lib/api-client";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { Post } from "./models";

const getPosts = async (params: { queryTerm: string; page: number }) => {
  const response = await apiClient.get<Post[]>("/posts", {
    params: {
      q: params.queryTerm || undefined,
      page: params.page,
      limit: 10,
    },
  });
  return response.data;
};

const getPost = async (id: string) => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: { title: string; content: string }) => {
  const response = await apiClient.post<{ id: string }>("/posts", data);
  return response.data;
};

export const updatePost = async (data: {
  id: string;
  title: string;
  content: string;
}) => {
  const response = await apiClient.patch(`/posts/${data.id}`, data);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
};

export const postQueries = {
  all: () => ["posts"],
  lists: () => [...postQueries.all(), "list"],
  list: (params: Omit<Parameters<typeof getPosts>[0], "page">) =>
    infiniteQueryOptions({
      queryKey: [...postQueries.lists(), { params }],
      queryFn: ({ pageParam }) => {
        return getPosts({
          queryTerm: params.queryTerm,
          page: pageParam,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      select: (data) => data.pages.flatMap((page) => page),
    }),
  details: (id: string) =>
    queryOptions({
      queryKey: [...postQueries.all(), "details", id],
      queryFn: () => getPost(id),
    }),
};
