import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { postQueries } from "@/api/posts";
import { FeedPage } from "@/pages/feed/feed-page";
import { defaultValues, searchSchema } from "@/pages/feed/lib/constants";

export const Route = createFileRoute("/")({
  component: FeedPage,
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search }) => {
    return {
      q: search.q,
    };
  },
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(postQueries.list(deps.q));
  },
});
