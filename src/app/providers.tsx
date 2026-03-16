import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TooltipProvider>
      {children}
      <ReactQueryDevtools />
    </TooltipProvider>
  );
};
