import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuthUser } from "@/lib/session";
import { AuthDialog } from "@/features/auth";

interface RequireAuthContext {
  closeDialog: () => void;
  openDialog: () => void;
  runIfAuthenticated: (callback: () => void) => void;
}

const RequireAuthContext = createContext<RequireAuthContext | null>(null);

export const RequireAuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const authUser = useAuthUser();

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const runIfAuthenticated: RequireAuthContext["runIfAuthenticated"] =
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

export const useRequireAuth = () => {
  const context = useContext(RequireAuthContext);
  if (!context) {
    throw new Error("useRequireAuth must be used within a RequireAuthContext");
  }
  return context;
};
