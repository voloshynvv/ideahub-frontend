import { useSuspenseQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/posts";
import { SearchInput } from "./components/search-input";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRouteApi } from "@tanstack/react-router";
import { EmptyState } from "./components/search-states";

const routeApi = getRouteApi("/");

export const FeedPage = () => {
  const params = routeApi.useSearch();
  const { data: posts } = useSuspenseQuery(postQueries.list(params.q));

  return (
    <div className="flex gap-10 py-4">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-end gap-2">
          <SearchInput />
          <Button>
            <PlusIcon />
            Create
          </Button>
        </div>

        {posts.length === 0 && <EmptyState />}

        {posts.length > 0 && (
          <div>
            {posts.map((post) => (
              <div>{post.title}</div>
            ))}
          </div>
        )}
      </div>

      <div className="w-40">tags</div>
    </div>
  );
};
