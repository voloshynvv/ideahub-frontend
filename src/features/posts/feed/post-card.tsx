import { Link } from "@tanstack/react-router";
import { timeAgo } from "@/lib/date";
import type { Post } from "@/types/model";

import { UserAvatar } from "@/components/common/user-avatar";
import { PostReactions } from "@/features/posts/shared/post-reactions/post-reactions";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="relative px-4 py-5">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <UserAvatar seed={post.user.image} />
          <p className="text-foreground text-sm">{post.user.name}</p>
        </div>
        <span className="text-muted-foreground ml-auto text-xs">
          {timeAgo(post.createdAt)}
        </span>
      </div>

      <div className="space-y-3">
        <Link
          className="hover:before:bg-muted-foreground/5 block before:absolute before:inset-0 before:transition-colors"
          to="/posts/$id"
          params={{ id: post.id }}
        >
          <p className="text-lg leading-relaxed">{post.title}</p>
        </Link>

        {post.tag && (
          <p className="text-muted-foreground text-xs">#{post.tag}</p>
        )}

        <PostReactions post={post} />
      </div>
    </article>
  );
};
