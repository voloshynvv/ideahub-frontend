import { Link } from "@tanstack/react-router";

import { AuthDialog } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";
import { currentUserOptions, useCurrentUser } from "@/api/auth";
import { UserAvatar } from "./user-avatar";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";

export const Navbar = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.invalidateQueries(currentUserOptions());
        },
      },
    });
  };

  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <div>
        <Link to="/" className="text-2xl font-bold">
          IdeasHub
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
