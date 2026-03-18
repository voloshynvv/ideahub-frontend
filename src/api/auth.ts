import { authClient } from "@/lib/auth-client";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
      const { error, data } = await authClient.getSession();
      if (error) throw error;
      return data?.user ?? null;
    },
    staleTime: Infinity,
  });

export const useCurrentUser = () => {
  const { data } = useSuspenseQuery(currentUserOptions());
  return data;
};
