import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const EmptyState = () => {
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
