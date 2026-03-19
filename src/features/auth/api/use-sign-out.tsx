import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();

  const signOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          queryClient.clear();
          router.invalidate();
          navigate({ to: "/", replace: true });
        },
      },
    });
  };

  return { signOut };
};
