import { useNavigate } from "@tanstack/react-router";
import {
  PostEditor,
  type PostEditorValues,
} from "@/features/posts/shared/post-editor";
import { useCreatePost } from "./use-create-post";

export const NewPostPage = () => {
  const createPost = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = (data: PostEditorValues) => {
    createPost.mutate(
      {
        title: data.title,
        content: data.content,
        tag: data.tag || null,
      },
      {
        onSuccess: (newPost) => {
          navigate({ to: "/posts/$id", params: { id: newPost.id } });
        },
      },
    );
  };

  return (
    <PostEditor isLoading={createPost.isPending} onSubmit={handleSubmit} />
  );
};
