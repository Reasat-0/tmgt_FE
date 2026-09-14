"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute cache freshness
        gcTime: 5 * 60 * 1000, // 5 minutes cache garbage collection
        retry: 1, // retry failed requests once
        refetchOnWindowFocus: false, // do not refetch on window focus
      },
      mutations: {
        retry: 1, // retry failed mutations once
      },
    },
  });
}

const browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClent() {
  // check if the environment is server ?
  if (environmentManager.isServer()) {
    // then create a new query client for each request to avoid sharing state between requests
    return makeQueryClient();
  } else {
    // if the environment is client, check if the browserQueryClient is already created, if not create it and return it
    if (!browserQueryClient) {
      return makeQueryClient();
    }
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(getQueryClent()); // useState is used to ensure that the query client is only created once per component instance
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      {children}
    </QueryClientProvider>
  );
}
