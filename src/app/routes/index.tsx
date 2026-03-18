import z from "zod";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { postQueries } from "@/api/posts";
import { FeedPage } from "@/pages/feed/feed-page";

export const defaultValues = {
  q: "",
};

export const Route = createFileRoute("/")({
  component: FeedPage,
  validateSearch: z.object({
    q: z.string().default(defaultValues.q).catch(defaultValues.q),
  }),
  errorComponent: ({ error }) => {
    return <div>Error: {error.message}</div>;
  },
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search }) => {
    return {
      q: search.q,
    };
  },
  loader: ({ context, deps }) => {
    return context.queryClient.ensureInfiniteQueryData(
      postQueries.list({ queryTerm: deps.q }),
    );
  },
});
