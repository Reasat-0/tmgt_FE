export interface ApiResponseType<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type ApiResultType<T> = ApiResponseType<T> | ApiErrorType;

export interface ApiErrorType {
  success: false;
  error: string;
  code?: string; // machine-readable, e.g. "INVALID_CREDENTIALS"
  statusCode?: number; // mirrors the HTTP status code
}
