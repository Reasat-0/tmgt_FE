// ============================================================
// TMGT — Group Travel Expense & Booking Manager
// File: app/(auth)/auth/page.tsx
//
// ============================================================

"use client";

import { type ReactNode } from "react";
import { AuthLayout } from "../modules/auth/pages/auth-layout/auth-layout";

// ─────────────────────────────────────────────────────────────
// PAGE — LAYOUT
// ─────────────────────────────────────────────────────────────

export default function AuthPage({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <>
      <AuthLayout> {children} </AuthLayout>
    </>
  );
}
