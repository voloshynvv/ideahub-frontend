import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/posts";

import {
  PostEditor,
  type PostEditorData,
} from "@/components/post-editor/post-editor";
import { useUpdatePost } from "./use-update-post";

const routeApi = getRouteApi("/posts_/$id/edit");

export const EditPostPage = () => {
  const { id } = routeApi.useParams();
  const navigate = useNavigate();
  const { data: post } = useSuspenseQuery(postQueries.details(id));
  const updatePost = useUpdatePost();

  const handleSubmit = (data: PostEditorData) => {
    updatePost.mutate(
      {
        id: post.id,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          navigate({ to: "/posts/$id", params: { id: post.id } });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <PostEditor
      isLoading={updatePost.isPending}
      onSubmit={handleSubmit}
      initialValues={post}
    />
  );
};
