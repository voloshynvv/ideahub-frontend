import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewPostPage } from "@/pages/new-post/new-post-page";

export const Route = createFileRoute("/posts/new")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/" });
    }
  },
  component: NewPostPage,
});
