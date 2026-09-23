import { useMutation } from "@tanstack/react-query";
import { LoginRequestType } from "../auth-schema";
import { loginClientCaller } from "../utils/auth-client-caller";

export function useLogin() {
  const onSubmitLogin = (data: LoginRequestType) => {
    // Handle login form submission
    loginMutate(data);
  };

  const {
    mutate: loginMutate,
    data,
    isPending: loginPending,
  } = useMutation({
    mutationFn: (value: LoginRequestType) => loginClientCaller(value),
    onSuccess: () => {
      alert("Login successful:");
    },
  });

  return {
    onSubmitLogin,
    loginPending,
  };
}
