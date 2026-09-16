import { clientFetch } from "@/app/lib/utils/client-fetch";

export async function loginClientCaller() {
  const config = {};
  await clientFetch("api/auth/login", {
    method: "POST",
    body: {},
  });
}
