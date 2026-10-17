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
  message: string;
  data?: T | undefined;
  meta?: ApiMetaType | undefined;
};

export type FieldError = {
  field: string;
  message: string;
};

export type ApiErrorType<T> = {
  success: false;
  message: string;
  error: {
    code: string;
    details?: FieldError[] | undefined;
  };
};

export type ApiResponseType<T> = ApiSuccessType<T> | ApiErrorType<T>;
