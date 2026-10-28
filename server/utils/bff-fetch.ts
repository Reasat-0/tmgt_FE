import {
   ApiMetaType,
   ApiResponseType,
   ApiSuccessType,
   FieldError,
} from '../types/common';

const API_BASE_URL = process.env.BASE_API_URL || 'http://localhost:5000';

interface bffFetchOptionsType {
   method?: string;
   body?: unknown;
   token?: string;
   cache?: RequestCache;
}

export class BffError extends Error {
   constructor(
      public statusCode: number,
      message: string,
      public code: string,
      public success: boolean = false,
      public errors?: FieldError[]
   ) {
      super(message);
      this.name = 'BffError';
   }
}

export async function bffFetch<T>(
   path: string,
   options: bffFetchOptionsType = {}
): Promise<ApiSuccessType<T>> {
   // Step 1 : Taking all the options and setting default values for method and cache if not provided
   const { method = 'GET', body, token, cache = 'no-store' } = options || {};

   // Step 2: Building the full URL by combining the base API URL with the provided path
   const url = `${API_BASE_URL}${path}`;

   // Step 3: Setting up the headers for the request, including Content-Type and Accept headers. If a token is provided, it adds an Authorization header.
   const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   };

   // Step 4: If a token is provided, it adds an Authorization header with the Bearer token.
   if (token) {
      headers['Authorization'] = `Bearer ${token}`;
   }
   let response: Response;

   // Step 5 : Hitting the backend API ...
   // 5.1: tries to fetch...
   try {
      response = await fetch(url, {
         method,
         headers,
         body: body ? JSON.stringify(body) : undefined,
         cache,
      });
   } catch (err) {
      // 5.2: If the fetch fails (e.g., due to network issues), it throws a BffError indicating that the server is unavailable.
      throw new BffError(
         500,
         'Unable to connect to the server.',
         'SERVER_UNAVAILABLE'
      );
   }
   let responseJson: ApiResponseType<T>;
   try {
      responseJson = await response.json();
   } catch {
      // Upstream sent something that is not JSON
      throw new BffError(
         502,
         'Invalid response from the server.',
         'BAD_GATEWAY'
      );
   }

   console.log('Backend response in BFFfetch......', responseJson);

   if (!response.ok || !responseJson.success) {
      const error = responseJson.success === false ? responseJson : undefined; // as the ApiResponseType<T> can be either ApiSuccessType<T> or ApiErrorType<T>
      throw new BffError(
         response.status,
         responseJson.message,
         error?.error?.code ?? 'UNKNOWN_ERROR',
         responseJson.success,
         error?.error?.details
      );
   }
   return responseJson;
}
