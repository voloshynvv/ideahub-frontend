import { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type AuthDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  children?: React.ReactElement;
};

export const AuthDialog = ({ children, ...props }: AuthDialogProps) => {
  const [activeForm, setActiveForm] = useState<"signIn" | "signUp">("signIn");
  const [_open, setOpen] = useState(false);

  // ensure that the open state works in both controlled and uncontrolled mode
  const open = props.open || _open;
  const onOpenChange = props.onOpenChange || setOpen;

  return (
    <Dialog {...props} open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger render={children} />}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to IdeasHub</DialogTitle>
          <DialogDescription>
            Don&apos;t have an account?{" "}
            {activeForm === "signIn" ? (
              <Button variant="link" onClick={() => setActiveForm("signUp")}>
                Sign up
              </Button>
            ) : (
              <Button variant="link" onClick={() => setActiveForm("signIn")}>
                Sign in
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>

        {activeForm === "signIn" ? (
          <SignInForm />
        ) : (
          <SignUpForm onSignedUp={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};
