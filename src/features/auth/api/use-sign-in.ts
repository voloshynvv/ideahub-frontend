import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { sessionOptions } from "@/lib/session";
import { useRequireAuth } from "@/context/require-auth";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { closeDialog } = useRequireAuth();

  const signIn = async (data: { email: string; password: string }) => {
    await authClient.signIn.email(
      { email: data.email, password: data.password },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          await queryClient.refetchQueries(sessionOptions());
          router.invalidate();
          closeDialog();
        },
        onError: ({ error }) => {
          setErrorMessage(error.message);
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return { signIn, isLoading, errorMessage };
};
