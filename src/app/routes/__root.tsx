import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { sessionOptions } from "@/lib/session";
import type { AuthUser } from "@/types/model";
import { RequireAuthProvider } from "@/context/require-auth-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { NotFoundFallback } from "@/components/fallbacks/not-found-fallback";
import { ErrorFallback } from "@/components/fallbacks/error-fallback";

interface RootContext {
  queryClient: QueryClient;
  user: AuthUser | null;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionOptions());
    return { user };
  },
  errorComponent: ErrorFallback,
  notFoundComponent: NotFoundFallback,
});

function RootLayout() {
  return (
    <TooltipProvider>
      <RequireAuthProvider>
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6">
          <Navbar />
          <main className="flex flex-1 flex-col py-10">
            <Outlet />
          </main>
        </div>
      </RequireAuthProvider>
      <ReactQueryDevtools />
    </TooltipProvider>
  );
}
