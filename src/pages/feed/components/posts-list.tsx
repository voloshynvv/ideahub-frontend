import { useEffect } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { postQueries } from "@/api/posts";
import { useInViewport } from "@mantine/hooks";

import { EmptyState } from "./search-states";
import { PostCard } from "./post-card";

const routeApi = getRouteApi("/");

export const PostsList = () => {
  const params = routeApi.useSearch();
  const { ref, inViewport } = useInViewport();

  const { data: posts, fetchNextPage } = useSuspenseInfiniteQuery(
    postQueries.list({ queryTerm: params.q }),
  );

  useEffect(() => {
    if (inViewport) {
      fetchNextPage();
    }
  }, [inViewport, fetchNextPage]);

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="relative pb-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={ref} />
    </div>
  );
};
