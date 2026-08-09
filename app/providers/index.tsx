"use client";

import { QueryProvider } from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {/* The rest of application */}
      {children}
    </QueryProvider>
  );
}
