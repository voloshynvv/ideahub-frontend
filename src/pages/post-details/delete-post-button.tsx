import { AppAlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useDeletePost } from "./use-delete-post";

interface PostDeleteButtonProps {
  postId: string;
}

export const DeletePostButton = ({ postId }: PostDeleteButtonProps) => {
  const navigate = useNavigate();
  const deletePost = useDeletePost();

  const handleConfirm = () => {
    deletePost.mutate(postId, {
      onSuccess: () => navigate({ to: "/" }),
    });
  };

  return (
    <AppAlertDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone."
      actionText="Confirm"
      onAction={handleConfirm}
    >
      <Button variant="destructive">Delete</Button>
    </AppAlertDialog>
  );
};
