import { formatDistanceToNow } from "date-fns";

export const timeAgo = (isoDate: string) => {
  return formatDistanceToNow(new Date(isoDate), {
    addSuffix: true,
  });
};
