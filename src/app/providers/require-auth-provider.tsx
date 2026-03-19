import { useCallback, useMemo, useState } from "react";
import { useAuthUser } from "@/lib/session";
import { AuthDialog } from "@/features/auth";
import {
  RequireAuthContext,
  type RequireAuthContextType,
} from "@/context/require-auth";

export const RequireAuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const authUser = useAuthUser();

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const runIfAuthenticated: RequireAuthContextType["runIfAuthenticated"] =
    useCallback(
      (callback) => {
        if (!authUser) {
          setIsOpen(true);
          return;
        }

        callback();
      },
      [authUser],
    );

  const value = useMemo(
    () => ({ runIfAuthenticated, closeDialog, openDialog }),
    [runIfAuthenticated, closeDialog, openDialog],
  );

  return (
    <RequireAuthContext value={value}>
      {children}
      <AuthDialog open={isOpen} onOpenChange={setIsOpen} />
    </RequireAuthContext>
  );
};
