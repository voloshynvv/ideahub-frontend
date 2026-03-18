import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { currentUserOptions } from "@/api/auth";
import type { AuthUser } from "@/api/models";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { NotFoundFallback } from "@/components/fallbacks/not-found-fallback";
import { ErrorFallback } from "@/components/fallbacks/error-fallback";

interface RootContext {
  queryClient: QueryClient;
  user: AuthUser | null;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
  beforeLoad: async ({ context }) => {
    const user =
      await context.queryClient.ensureQueryData(currentUserOptions());
    return { user };
  },
  errorComponent: ErrorFallback,
  notFoundComponent: NotFoundFallback,
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
