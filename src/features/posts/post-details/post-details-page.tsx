import Markdown from "react-markdown";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { timeAgo } from "@/lib/date";
import { useAuthUser } from "@/lib/session";

import { buttonVariants } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/user-avatar";
import { PostReactions } from "@/features/posts/shared/post-reactions/post-reactions";

import { DeletePostButton } from "@/features/posts/post-details/delete-post-button";
import { postQueries } from "@/features/posts/shared/queries";

const routeApi = getRouteApi("/posts/$id");

export const PostDetailsPage = () => {
  const { id } = routeApi.useParams();
  const { data: post } = useSuspenseQuery(postQueries.details(id));
  const user = useAuthUser();

  return (
    <div>
      <Link
        to="/"
        className="hover:text-muted-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeftIcon className="size-3.5" />
        <span>Back</span>
      </Link>

      <div className="divide-y">
        <div className="space-y-5 py-6">
          <div className="flex items-center gap-3">
            <UserAvatar seed={post.user.image} />
            <div>
              <p className="text-foreground text-sm">{post.user.name}</p>
              <p className="text-muted-foreground text-xs">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h1>{post.title}</h1>
            {post.tag && (
              <p className="text-muted-foreground bg-muted w-fit rounded px-2 py-0.5 text-xs">
                #{post.tag}
              </p>
            )}
          </div>

          {user && user.id === post.user.id && (
            <div className="flex items-center gap-2">
              <Link
                className={buttonVariants({ variant: "secondary" })}
                to="/posts/$id/edit"
                params={{ id: post.id }}
              >
                Edit
              </Link>

              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-full py-6">
          <Markdown>{post.content}</Markdown>
        </div>

        <div className="space-y-2 py-6">
          <PostReactions post={post} />
        </div>
      </div>
    </div>
  );
};
