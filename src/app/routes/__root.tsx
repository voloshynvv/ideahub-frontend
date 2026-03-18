import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";

interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Providers>
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </Providers>
  );
}

function Providers({ children }: React.PropsWithChildren) {
  return (
    <TooltipProvider>
      {children}
      <ReactQueryDevtools />
    </TooltipProvider>
  );
}
