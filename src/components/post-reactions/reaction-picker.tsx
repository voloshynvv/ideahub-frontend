import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { SmilePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReactionPickerProps {
  onReactionClick: (emoji: EmojiClickData) => void;
}

export const ReactionPicker = ({ onReactionClick }: ReactionPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground"
          >
            <SmilePlusIcon className="size-4" />
            <span className="sr-only">add a reaction</span>
          </Button>
        }
      />
      <PopoverContent
        side="right"
        className="w-fit rounded-2xl border-0 bg-transparent p-0 shadow-xl ring-0"
      >
        <EmojiPicker
          onReactionClick={(data) => {
            setOpen(false);
            onReactionClick(data);
          }}
          reactionsDefaultOpen
          allowExpandReactions={false}
          autoFocusSearch={false}
          previewConfig={{ showPreview: false }}
          reactions={[
            "1f44d",
            "1f44e",
            "2764-fe0f",
            "1f680",
            "1f440",
            "1f914",
            "1f4a1",
          ]}
          style={
            {
              "--epr-emoji-size": "18px",
              "--epr-picker-border-radius": "16px",
            } as React.CSSProperties
          }
        />
      </PopoverContent>
    </Popover>
  );
};
