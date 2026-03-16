import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { Providers } from "@/app/providers";
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
      <div className="mx-auto max-w-4xl px-6">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </Providers>
  );
}
