import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const loginHandler = async () => {
    await fetch("/api/auth/login", {});
  };
  const loginMutate = useMutation({});
}
