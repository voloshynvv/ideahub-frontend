import z from "zod";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { FeedPage, postQueries } from "@/features/posts";

export const defaultValues = {
  q: "",
};

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    q: z.string().default(defaultValues.q).catch(defaultValues.q),
  }),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search }) => {
    return {
      q: search.q,
    };
  },
  loader: ({ context, deps }) => {
    context.queryClient.ensureInfiniteQueryData(
      postQueries.list({ queryTerm: deps.q }),
    );
  },
  component: FeedPage,
});
