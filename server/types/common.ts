export type ApiMetaType = {
  timestamp: string;
  requestId?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiSuccessType<T> = {
  success: true;
  data: T;
  message?: string;
  statusCode?: number;
  meta?: ApiMetaType;
};

export type ApiErrorType = {
  success: false;
  statusCode: number; // mirrors the HTTP status code
  message: string;
  errors?: unknown;
  code?: string; // machine-readable, e.g. "INVALID_CREDENTIALS"
  meta?: ApiMetaType;
};

export type ApiResponseType<T> = ApiSuccessType<T> | ApiErrorType;
