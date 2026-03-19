import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { sessionOptions } from "@/lib/session";
import { useRouter } from "@tanstack/react-router";
import { useRequireAuth } from "@/context/require-auth";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { closeDialog } = useRequireAuth();

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
    image?: string;
  }) => {
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        image: data.image ?? "",
      },
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

  return { isLoading, errorMessage, signUp };
};
