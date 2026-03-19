import { Link } from "@tanstack/react-router";
import { useAuthUser } from "@/lib/session";
import { useRequireAuth } from "@/context/require-auth-provider";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/user-avatar";
import { SignOutButton } from "@/features/auth";

export const Navbar = () => {
  const user = useAuthUser();
  const { openDialog } = useRequireAuth();

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

          <SignOutButton />
        </div>
      ) : (
        <Button onClick={openDialog}>Sign in</Button>
      )}
    </header>
  );
};
