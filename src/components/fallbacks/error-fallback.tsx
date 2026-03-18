import { AlertCircleIcon } from "lucide-react";

export const ErrorFallback = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-border w-full max-w-md p-8 text-center">
        <div className="bg-destructive/10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full">
          <AlertCircleIcon className="text-destructive h-6 w-6" />
        </div>
        <h1 className="text-foreground mb-2 text-xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          We're having trouble loading this page. Please try refreshing or go
          back to the previous page.
        </p>
      </div>
    </div>
  );
};
