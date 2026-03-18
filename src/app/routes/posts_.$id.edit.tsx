import { currentUserOptions } from "@/api/auth";
import { postQueries } from "@/api/posts";
import { EditPostPage } from "@/pages/edit-post/edit-post-page";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/posts_/$id/edit")({
  beforeLoad: async ({ context, params }) => {
    try {
      const postPromise = context.queryClient.ensureQueryData(
        postQueries.details(params.id),
      );
      const userPromise =
        context.queryClient.ensureQueryData(currentUserOptions());

      const [post, user] = await Promise.all([postPromise, userPromise]);

      if (user?.id !== post.user.id) {
        throw new Error("not found");
      }
    } catch {
      throw notFound();
    }
  },
  notFoundComponent: () => {
    return <div>NOT FOUND</div>;
  },
  component: EditPostPage,
});
