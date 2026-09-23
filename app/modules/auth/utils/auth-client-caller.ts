import { clientFetch, ClientFetcherConfig } from "@/app/lib/utils/client-fetch";
import { LoginRequestType } from "../auth-schema";

export async function loginClientCaller(payload: LoginRequestType) {
  const config: ClientFetcherConfig = {
    method: "POST",
    body: { ...payload },
  };
  await clientFetch("api/auth/login", config);
}
