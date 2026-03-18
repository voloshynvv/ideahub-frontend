import { useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { currentUserOptions } from "@/api/auth";
import { AlertCircleIcon } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email({
      error: (issue) =>
        issue.input === ""
          ? "Email is required"
          : "Please, provide a valid email address",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

interface SignUpFormProps {
  onSignedUp?: () => void;
}

export const SignUpForm = ({ onSignedUp }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      name: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          queryClient.invalidateQueries(currentUserOptions());
          onSignedUp?.();
        },
        onError: ({ error }) => {
          setErrorMessage(error.message);
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    );
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {errorMessage && (
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>
            We could not create your account. Please try again later.
          </AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-10">
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Avatar</FieldLabel>
                  <FieldDescription>
                    Try different words or numbers to find a style you love
                  </FieldDescription>
                  <Input {...field} id={field.name} />
                </Field>
                <UserAvatar seed={field.value ?? ""} />
              </div>
            )}
          />
        </FieldGroup>
      </div>

      <Button disabled={isLoading} type="submit">
        Create account
      </Button>
    </form>
  );
};
