import { ApiMetaType, ApiResponseType } from "../types/common";

const API_BASE_URL = process.env.BASE_API_URL || "http://localhost:5000";

interface backendFetchOptionsType {
  method?: string;
  body?: unknown;
  token?: string;
  cache?: RequestCache;
}

export class BackendError extends Error {
  constructor(
    public success: boolean = false,
    public statusCode: number,
    message: string,
    public errors?: unknown,
    public code?: string,
    public meta?: ApiMetaType,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

export async function backendFetch<T>(
  path: string,
  options: backendFetchOptionsType = {},
): Promise<ApiResponseType<T>> {
  // Step 1 : Taking all the options and setting default values for method and cache if not provided
  const { method = "GET", body, token, cache = "no-store" } = options || {};

  // Step 2: Building the full URL by combining the base API URL with the provided path
  const url = `${API_BASE_URL}${path}`;

  // Step 3: Setting up the headers for the request, including Content-Type and Accept headers. If a token is provided, it adds an Authorization header.
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Step 4: If a token is provided, it adds an Authorization header with the Bearer token.
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    });
  } catch (err) {
    throw new BackendError(
      false,
      503,
      "Unable to connect to the backend server.",
    );
  }

  const res: ApiResponseType<T> = await response.json();

  if (!res.success) {
    throw new BackendError(
      res.success,
      res.statusCode as number,
      res.message,
      res.errors,
      res.code,
      res.meta,
    );
  }
  return res;
}
