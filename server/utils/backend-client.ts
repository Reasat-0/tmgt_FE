import { ApiResultType } from "../types/common";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

interface backendFetchOptionsType {
  method?: string;
  body?: unknown;
  token?: string;
  cache?: RequestCache;
}

export async function backendFetch<T>(
  path: string,
  options: backendFetchOptionsType = {},
): Promise<ApiResultType<T>> {
  const { method = "GET", body, token, cache = "no-store" } = options || {};

  const url = `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    });
    const json = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        success: false,
        error: json?.message || "An error occurred while fetching data.",
        code: json?.code || response.status,
      };
    }

    return {
      success: true,
      data: json.data ?? json,
      message: json.message,
    };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An unknown error occurred while fetching data.",
      code: "NETWORK_ERROR",
      statusCode: 503,
    };
  }
}
