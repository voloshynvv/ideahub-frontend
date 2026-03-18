import type { Post } from "@/api/models";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@mantine/hooks";
import { useCurrentUser } from "@/api/auth";
import { useToggleReaction } from "./use-toggle-reaction";

import { Button } from "@/components/ui/button";
import { ReactionPicker } from "./reaction-picker";
import { AuthDialog } from "@/components/auth/auth-dialog";

interface PostReactionsProps {
  post: Post;
}

export const PostReactions = ({ post }: PostReactionsProps) => {
  const { toggle, isPending } = useToggleReaction(post.id);
  const user = useCurrentUser();
  const [open, handlers] = useDisclosure();

  return (
    <>
      <AuthDialog open={open} onOpenChange={handlers.toggle} />

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
              if (!user) {
                handlers.open();
                return;
              }
              toggle(reaction);
            }}
          >
            <img
              width={16}
              height={16}
              src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${reaction.name}.png`}
              alt={reaction.name}
            />
            <span className="">{reaction.count}</span>
          </Button>
        ))}

        <ReactionPicker
          onReactionClick={(data) => {
            if (!user) {
              handlers.open();
              return;
            }
            toggle({ name: data.unified, hasReacted: false });
          }}
        />
      </div>
    </>
  );
};
