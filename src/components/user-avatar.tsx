import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArtNeutral } from "@dicebear/collection";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends React.ComponentProps<typeof Avatar> {
  seed: string | null;
}

export const UserAvatar = ({ seed, ...props }: UserAvatarProps) => {
  const avatar = useMemo(() => {
    return createAvatar(pixelArtNeutral, {
      seed: seed ?? "",
      size: 128,
    }).toDataUri();
  }, [seed]);
  console.log(avatar);

  return (
    <Avatar {...props}>
      <AvatarImage src={avatar ?? undefined} alt="avatar" />
    </Avatar>
  );
};
