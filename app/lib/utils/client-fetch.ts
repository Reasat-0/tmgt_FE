import { ApiResponseType } from "../../../server/types/common";

interface ClientFetcherConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export async function clientFetch<T>(
  path: string,
  config: ClientFetcherConfig = { method: "GET" },
): Promise<ApiResponseType<T>> {
  try {
    const { method, body } = config;
    // Every request needs these two headers.
    // Unlike server/fetcher.ts there is NO Authorization header here —
    // the browser attaches the HttpOnly cookie automatically.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", // Ensures cookies are sent with the request
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        message: json?.message || "An unexpected error occurred.",
        success: false,
        code: json?.code, // e.g. "INVALID_CREDENTIALS"
        statusCode: response.status,
        errors: json?.errors, // Optional, in case the backend returns validation errors
      };
    }
    return {
      success: true,
      data: (json?.data ?? json) as T,
      message: json?.message,
    };
  } catch {
    // fetch() itself threw — no internet, Next.js is down, etc.
    // Return a consistent ApiError instead of crashing the app.
    return {
      success: false,
      errors: "Could not reach the server. Please check your connection.",
      code: "NETWORK_ERROR",
      statusCode: 503,
      message: "Could not reach the server. Please check your connection.",
    };
  }

  return Promise.resolve({
    success: false,
    statusCode: 501,
    message: "Not implemented",
  });
}
