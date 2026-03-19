import { getRouteApi } from "@tanstack/react-router";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { usePosts } from "@/features/posts/feed/use-posts";
import { PostCard } from "@/features/posts/feed/post-card";

const routeApi = getRouteApi("/");

export const PostList = () => {
  const params = routeApi.useSearch();
  const { posts, ref } = usePosts({ queryTerm: params.q });

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

const EmptyState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No ideas found</EmptyTitle>
        <EmptyDescription>
          If you would like to say something sign in and share your thoughts.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
