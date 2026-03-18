import { useNavigate } from "@tanstack/react-router";
import { useCreatePost } from "./use-create-post";

import {
  PostEditor,
  type PostEditorData,
} from "@/components/post-editor/post-editor";

export const NewPostPage = () => {
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const handleSubmit = (data: PostEditorData) => {
    createPost.mutate(
      {
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: (newPost) => {
          navigate({ to: "/posts/$id", params: { id: newPost.id } });
        },
      },
    );
  };

  return <PostEditor onSubmit={handleSubmit} />;
};
