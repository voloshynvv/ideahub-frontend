import { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { useAuthUser } from "@/lib/session";

import { buttonVariants } from "@/components/ui/button";
import { LoadingState, PostList } from "./post-list";
import { SearchInput } from "./search-input";

export const FeedPage = () => {
  const user = useAuthUser();

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center justify-end gap-2">
          <SearchInput />

          {user && (
            <Link to="/posts/new" className={buttonVariants()}>
              Create
            </Link>
          )}
        </div>

        <Suspense fallback={<LoadingState />}>
          <PostList />
        </Suspense>
      </div>
    </div>
  );
};
