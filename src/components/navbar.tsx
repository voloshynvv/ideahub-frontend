import { Link, useNavigate } from "@tanstack/react-router";
import { currentUserOptions, useCurrentUser } from "@/api/auth";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";

import { AuthDialog } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./user-avatar";

export const Navbar = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await queryClient.invalidateQueries(currentUserOptions());
          navigate({ to: "/", replace: true });
        },
      },
    });
  };

  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <div>
        <Link to="/" className="text-2xl font-bold">
          IdeaHub
        </Link>
        <p className="text-muted-foreground text-sm">
          Thoughts worth thinking about.
        </p>
      </div>

      {user ? (
        <div className="flex items-center gap-5">
          <Link className="flex items-center gap-3" to="/">
            <p>Hi,{user.name}</p>
            <UserAvatar seed={user.name} />
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <AuthDialog>
          <Button>Sign in</Button>
        </AuthDialog>
      )}
    </header>
  );
};
