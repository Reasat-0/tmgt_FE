import { ApiResponseType } from "../../../server/types/common";

class ClientError extends Error {
  code?: string; // eg: INVALID_CREDENTIALS, NETWORK_ERROR, etc.
  statusCode?: number;
  errors?: unknown;

  constructor(
    message: string,
    options?: { code?: string; errors?: unknown; statusCode?: number },
  ) {
    super();
    this.name = "ClientError";
    this.message = message;
    this.code = options?.code;
    this.statusCode = options?.statusCode;
    this.errors = options?.errors;
  }
}

export interface ClientFetcherConfig {
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
    console.log(response);

    if (!response.ok) {
      throw new ClientError(
        json?.message || "An error occurred while fetching data.",
        {
          errors: json?.errors,
          code: json?.code,
          statusCode: response.status,
        },
      );
    }
    return {
      success: true,
      data: (json?.data ?? json) as T,
      message: json?.message,
    };
  } catch (err) {
    // fetch() itself threw — no internet, Next.js is down, etc.
    // Return a consistent ApiError instead of crashing the app.
    throw new ClientError(
      err instanceof Error ? err.message : "An unexpected error occurred.",
      {
        errors: "Could not reach the server. Please check your connection.",
        code: "NETWORK_ERROR",
        statusCode: 503,
      },
    );
  }
}
