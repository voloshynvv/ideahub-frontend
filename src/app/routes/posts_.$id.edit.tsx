import { isNotFound, notFound } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { EditPostPage, postQueries } from "@/features/posts";

export const Route = createFileRoute("/posts_/$id/edit")({
  loader: async ({ context, params }) => {
    try {
      const post = await context.queryClient.ensureQueryData(
        postQueries.details(params.id),
      );

      if (!context.user || post.user.id !== context.user?.id) {
        throw notFound();
      }

      return { post };
    } catch (e) {
      if (isNotFound(e)) throw e;

      throw notFound();
    }
  },
  component: EditPostPage,
});
