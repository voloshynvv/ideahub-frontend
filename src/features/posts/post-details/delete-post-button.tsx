import { AppAlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "./use-delete-post";
import { useNavigate } from "@tanstack/react-router";

interface PostDeleteButtonProps {
  postId: string;
}

export const DeletePostButton = ({ postId }: PostDeleteButtonProps) => {
  const deletePost = useDeletePost();
  const navigate = useNavigate();

  const handleConfirm = () => {
    deletePost.mutate(postId, {
      onSuccess: () => {
        navigate({ to: "/" });
      },
    });
  };

  return (
    <AppAlertDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone."
      actionText="Confirm"
      onAction={handleConfirm}
      loading={deletePost.isPending}
    >
      <Button variant="destructive">Delete</Button>
    </AppAlertDialog>
  );
};
