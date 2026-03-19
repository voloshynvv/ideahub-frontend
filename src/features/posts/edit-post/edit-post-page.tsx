import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  PostEditor,
  type PostEditorValues,
} from "@/features/posts/shared/post-editor";
import { postQueries } from "@/features/posts/shared/queries";
import { useUpdatePost } from "@/features/posts/edit-post/use-update-post";

const routeApi = getRouteApi("/posts_/$id/edit");

export const EditPostPage = () => {
  const { id } = routeApi.useParams();
  const navigate = useNavigate();
  const { data: post } = useSuspenseQuery(postQueries.details(id));
  const updatePost = useUpdatePost();

  const handleSubmit = (values: PostEditorValues) => {
    updatePost.mutate(
      {
        id: post.id,
        title: values.title,
        content: values.content,
        tag: values.tag || null,
      },
      {
        onSuccess: () => {
          navigate({ to: "/posts/$id", params: { id: post.id } });
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
