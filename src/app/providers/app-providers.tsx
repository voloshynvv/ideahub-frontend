import { TooltipProvider } from "@/components/ui/tooltip";
import { RequireAuthProvider } from "./require-auth-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AppProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <TooltipProvider>
      <RequireAuthProvider>{children}</RequireAuthProvider>
      <ReactQueryDevtools />
    </TooltipProvider>
  );
};
