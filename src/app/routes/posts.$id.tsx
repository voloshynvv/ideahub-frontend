import { createFileRoute, notFound } from "@tanstack/react-router";
import { PostDetailsPage, postQueries } from "@/features/posts";

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
