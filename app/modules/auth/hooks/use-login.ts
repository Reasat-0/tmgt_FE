import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { LoginRequestType } from "../auth-schema";
import { loginClientCaller } from "../utils/auth-client-caller";

export function useLogin({ data }: { data: LoginRequestType }) {
  const onSubmitLogin = (data: z.infer<LoginRequestType>) => {
    // Handle login form submission
    console.log(data);
  };

  const loginMutate = useMutation({
    mutationFn: () => loginClientCaller(),
  });

  return {
    onSubmitLogin,
  };
}
