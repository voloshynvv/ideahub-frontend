import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AlertCircleIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSignIn } from "../api/use-sign-in";

const signInSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === ""
        ? "Email is required"
        : "Please, provide a valid email address",
  }),
  password: z.string().min(1, "Password is required"),
});

export const SignInForm = () => {
  const { errorMessage, isLoading, signIn } = useSignIn();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(signIn);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {errorMessage && (
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                type="password"
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button disabled={isLoading} type="submit">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
};
