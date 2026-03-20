import { getRouteApi } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/features/posts/feed/use-posts";
import { PostCard } from "@/features/posts/feed/post-card";

const routeApi = getRouteApi("/");

export const PostList = () => {
  const params = routeApi.useSearch();
  const { posts, ref, isFetchingNextPage } = usePosts({ queryTerm: params.q });

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="relative pb-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={ref} />
      {isFetchingNextPage && (
        <Loader2 className="text-primary mt-8 animate-spin" />
      )}
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
export const PostCardLoading = () => {
  return (
    <article className="relative px-4 py-5">
      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="size-8 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="ml-auto h-3 w-14" />
      </div>
      <div className="mb-3 space-y-2">
        <Skeleton className="h-6 max-w-md" />
        <Skeleton className="h-6 max-w-sm" />
      </div>
      <Skeleton className="mb-3 h-3 w-20" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
    </article>
  );
};

export function LoadingState() {
  return (
    <div className="relative pb-8" aria-busy="true" aria-label="Loading posts">
      {Array.from({ length: 10 }, (_, i) => (
        <PostCardLoading key={i} />
      ))}
    </div>
  );
}
