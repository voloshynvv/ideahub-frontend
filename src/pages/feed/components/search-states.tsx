import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const EmptyState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No data found</EmptyTitle>
        <EmptyDescription>
          If you would like to say something click the button below to share
          your thoughts.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Share your first idea</Button>
      </EmptyContent>
    </Empty>
  );
};
