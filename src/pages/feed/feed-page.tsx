import { Link } from "@tanstack/react-router";
import { useCurrentUser } from "@/api/auth";

import { buttonVariants } from "@/components/ui/button";
import { PostsList } from "./components/posts-list";
import { SearchInput } from "./components/search-input";

export const FeedPage = () => {
  const user = useCurrentUser();

  return (
    <div className="flex gap-10 py-4">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-end gap-2">
          <SearchInput />
          {user && (
            <Link to="/posts/new" className={buttonVariants()}>
              Create
            </Link>
          )}
        </div>

        <PostsList />
      </div>

      <div className="w-40">tags</div>
    </div>
  );
};
