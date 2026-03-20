import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          queryClient.clear();
          navigate({ to: "/" });
          router.invalidate();
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    });
  };

  return { signOut, isLoading };
};
