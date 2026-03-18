import { createFileRoute } from "@tanstack/react-router";
import { NewPostPage } from "@/pages/new-post/new-post-page";

export const Route = createFileRoute("/posts/new")({
  component: NewPostPage,
});
