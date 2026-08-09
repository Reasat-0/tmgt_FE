// ============================================================
// TMGT — Group Travel Expense & Booking Manager

// Stack : Next.js 14+ · TypeScript · Tailwind CSS v4 · shadcn/ui
// Colors: 100% from global.css @theme design tokens
//
// shadcn/ui deps (run once):
//   npx shadcn@latest add button input label checkbox
// ============================================================

"use client";

import { type ReactNode } from "react";
import { LeftPanel } from "./internals/left-panel";

// ─────────────────────────────────────────────────────────────
// PAGE — ROOT COMPONENT
// ─────────────────────────────────────────────────────────────

export function AuthLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "linear-gradient(145deg, var(--color-brand-900), var(--color-surfaceBrandPrimary) 52%, var(--color-surfaceGreenPrimary))",
      }}
    >
      {/* ══ LEFT — Branding panel ══ */}
      <LeftPanel />

      {/* ══ RIGHT — Auth form ══ */}
      <main className="flex-1 bg-surfaceBaseSecondary flex items-center justify-center px-8 py-12 lg:px-16 xl:px-24 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
