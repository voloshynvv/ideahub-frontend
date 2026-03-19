import { queryOptions } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { authClient } from "./auth-client";

export const sessionOptions = () =>
  queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
      const { error, data } = await authClient.getSession();
      if (error) {
        throw error;
      }
      return data?.user ?? null;
    },
    staleTime: Infinity,
  });

export const useAuthUser = () => {
  return useRouteContext({
    select: (ctx) => ctx.user ?? null,
    strict: false,
  });
};
