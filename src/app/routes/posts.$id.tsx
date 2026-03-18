import { postQueries } from "@/api/posts";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PostDetailsPage } from "@/pages/post-details/post-details-page";

export const Route = createFileRoute("/posts/$id")({
  loader: async ({ context, params }) => {
    try {
      const post = await context.queryClient.ensureQueryData(
        postQueries.details(params.id),
      );
      return { post };
    } catch {
      throw notFound();
    }
  },
  component: PostDetailsPage,
});
