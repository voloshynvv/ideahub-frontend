import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { sessionOptions } from "@/lib/session";
import type { AuthUser } from "@/types/model";
import { AppProviders } from "@/app/providers/app-providers";
import { Navbar } from "@/components/layout/navbar";
import { NotFoundFallback } from "@/components/fallbacks/not-found-fallback";
import { ErrorFallback } from "@/components/fallbacks/error-fallback";

interface RootContext {
  queryClient: QueryClient;
  user: AuthUser | null;
}

export const Route = createRootRouteWithContext<RootContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(sessionOptions());
    return { user };
  },
  component: RootLayout,
  errorComponent: ErrorFallback,
  notFoundComponent: NotFoundFallback,
});

function RootLayout() {
  return (
    <AppProviders>
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 md:px-6">
        <Navbar />
        <main className="flex flex-1 flex-col py-10">
          <Outlet />
        </main>
      </div>
    </AppProviders>
  );
}
