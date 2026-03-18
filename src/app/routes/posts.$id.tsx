import { postQueries } from "@/api/posts";
import { PostDetailsPage } from "@/pages/post-details/post-details-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$id")({
  component: PostDetailsPage,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(postQueries.details(params.id));
  },
});
