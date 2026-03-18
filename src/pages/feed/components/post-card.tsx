import type { Post } from "@/api/models";
import { Link } from "@tanstack/react-router";

import { UserAvatar } from "@/components/user-avatar";
import { PostReactions } from "@/components/post-reactions/post-reactions";
import { timeAgo } from "@/lib/date";

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

      <Link
        className="hover:before:bg-muted-foreground/5 mb-3 before:absolute before:inset-0 before:transition-colors"
        to="/posts/$id"
        params={{ id: post.id }}
      >
        <p className="text-lg leading-relaxed">{post.title}</p>
      </Link>

      <p className="text-muted-foreground mb-3 text-xs">#tag</p>
      <PostReactions post={post} />
    </article>
  );
};
