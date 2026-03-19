import { createContext, useContext } from "react";

export interface RequireAuthContextType {
  closeDialog: () => void;
  openDialog: () => void;
  runIfAuthenticated: (callback: () => void) => void;
}

export const RequireAuthContext = createContext<RequireAuthContextType | null>(
  null,
);

export const useRequireAuth = () => {
  const context = useContext(RequireAuthContext);
  if (!context) {
    throw new Error("useRequireAuth must be used within a RequireAuthContext");
  }
  return context;
};
