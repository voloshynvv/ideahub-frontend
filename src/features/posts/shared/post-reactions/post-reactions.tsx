import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/model";
import { useRequireAuth } from "@/context/require-auth";

import { Button } from "@/components/ui/button";
import { ReactionPicker } from "./reaction-picker";
import { useToggleReaction } from "./use-toggle-reaction";

interface PostReactionsProps {
  post: Post;
}

export const PostReactions = ({ post }: PostReactionsProps) => {
  const { runIfAuthenticated } = useRequireAuth();
  const { toggle, isPending, isAnyPending } = useToggleReaction(post.id);

  const reactionRowPending = post.reactions.some((r) => isPending(r.name));
  const pickerLoading = isAnyPending && !reactionRowPending;

  return (
    <div className="isolate flex w-fit items-center gap-1.5">
      {post.reactions.map((reaction) => (
        <Button
          key={reaction.name}
          className={cn(
            "text-muted-foreground h-7 gap-1 text-xs font-normal disabled:opacity-100",
            reaction.hasReacted && "bg-muted text-foreground border-dashed",
          )}
          variant="outline"
          disabled={isPending(reaction.name)}
          onClick={() => {
            runIfAuthenticated(() => {
              toggle(reaction);
            });
          }}
        >
          <img
            width={16}
            height={16}
            src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${reaction.name}.png`}
            alt={reaction.name}
          />
          <span>
            {isPending(reaction.name) ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              reaction.count
            )}
          </span>
        </Button>
      ))}

      <ReactionPicker
        onReactionClick={(data) => {
          runIfAuthenticated(() => {
            toggle({ name: data.unified, hasReacted: false });
          });
        }}
      />

      {pickerLoading && <Loader2 className="size-3 animate-spin" />}
    </div>
  );
};
