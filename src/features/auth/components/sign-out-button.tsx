import { Button } from "@/components/ui/button";
import { useSignOut } from "@/features/auth/api/use-sign-out";

export const SignOutButton = () => {
  const { signOut, isLoading } = useSignOut();
  return (
    <Button onClick={signOut} loading={isLoading}>
      Logout
    </Button>
  );
};
