// ============================================================
// TMGT — Group Travel Expense & Booking Manager
// File: app/(auth)/auth/page.tsx
//
// Stack : Next.js 14+ · TypeScript · Tailwind CSS v4 · shadcn/ui
// Colors: 100% from global.css @theme design tokens
//
// shadcn/ui deps (run once):
//   npx shadcn@latest add button input label checkbox
// ============================================================

"use client";

import { RegisterForm } from "@/app/lib/components/tmgt/features/auth/register-form";
import { SubmitEvent, useState, type ReactNode } from "react";
import { LoginForm } from "../components/login-form/login-form";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type AuthTab = "login" | "register";

interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  /** Tailwind token class for the bar segment fill */
  barClass: string;
  /** Tailwind token class for the label text */
  textClass: string;
}

interface TmgtLogoProps {
  size?: number;
}

// ─────────────────────────────────────────────────────────────
// PASSWORD STRENGTH HELPER
// ─────────────────────────────────────────────────────────────

function getPasswordStrength(value: string): PasswordStrength {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  // Map score → design token classes from global.css
  const map: Record<
    number,
    { label: string; barClass: string; textClass: string }
  > = {
    0: {
      label: "",
      barClass: "bg-borderSubtle",
      textClass: "text-textDisabled",
    },
    1: {
      label: "Weak",
      barClass: "bg-stateError",
      textClass: "text-stateError",
    },
    2: {
      label: "Fair",
      barClass: "bg-stateWarning",
      textClass: "text-textAccent",
    },
    3: {
      label: "Good",
      barClass: "bg-stateSuccess",
      textClass: "text-stateSuccess",
    },
    4: {
      label: "Strong",
      barClass: "bg-surfaceBrandPrimary",
      textClass: "text-textBrand",
    },
  };

  const entry = map[score] ?? map[0];
  return { score: score as PasswordStrength["score"], ...entry };
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Recreated logo SVG — compass + mountains + golden star */
function TmgtLogo({ size = 72 }: TmgtLogoProps): ReactNode {
  const TICK_ANGLES = [0, 90, 180, 270] as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-label="TripMate logo"
    >
      {/* Outer dotted ring */}
      <circle
        cx="100"
        cy="100"
        r="94"
        stroke="var(--color-surfaceGreenPrimary)"
        strokeWidth="1.5"
        strokeDasharray="4 7"
      />
      {/* Cardinal tick marks */}
      {TICK_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={100 + 86 * Math.sin(rad)}
            y1={100 - 86 * Math.cos(rad)}
            x2={100 + 94 * Math.sin(rad)}
            y2={100 - 94 * Math.cos(rad)}
            stroke="var(--color-surfaceGreenPrimary)"
            strokeWidth="2.5"
          />
        );
      })}
      {/* Inner ring */}
      <circle
        cx="100"
        cy="100"
        r="78"
        stroke="rgba(255,255,255,.2)"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="100" r="77" fill="rgba(13,115,119,0.25)" />
      {/* Back mountains */}
      <polygon
        points="35,150 80,85 112,122"
        fill="var(--color-surfaceGreenPrimary)"
        opacity=".65"
      />
      <polygon
        points="88,150 132,88 168,150"
        fill="var(--color-surfaceGreenPrimary)"
        opacity=".65"
      />
      {/* Main mountain */}
      <polygon points="50,150 100,68 150,150" fill="var(--color-brand-800)" />
      {/* Snow cap */}
      <polygon
        points="91,94 100,68 109,94"
        fill="var(--color-brand-300)"
        opacity=".55"
      />
      {/* Compass star */}
      <polygon
        points="100,36 104.5,52 121,47 109,61 118,76 100,67 82,76 91,61 79,47 95.5,52"
        fill="var(--color-surfaceAccentPrimary)"
      />
      <circle cx="100" cy="55" r="5" fill="var(--color-surfaceBrandPrimary)" />
      {/* Bottom dots */}
      <circle
        cx="81"
        cy="160"
        r="3.5"
        fill="var(--color-surfaceGreenPrimary)"
      />
      <circle
        cx="100"
        cy="165"
        r="3.5"
        fill="var(--color-surfaceGreenPrimary)"
      />
      <circle
        cx="119"
        cy="160"
        r="3.5"
        fill="var(--color-surfaceGreenPrimary)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE — ROOT COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AuthPageContent(): ReactNode {
  const [tab, setTab] = useState<AuthTab>("login");
  const [showLoginPw, setShowLoginPw] = useState<boolean>(false);
  const [showRegPw, setShowRegPw] = useState<boolean>(false);
  const [showRegConfirm, setShowRegConfirm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    setLoading(true);
    // Replace with your actual auth logic (NextAuth, Supabase, etc.)
    setTimeout(() => setLoading(false), 1800);
  };

  const switchToRegister = (): void => {
    setTab("register");
    setPassword("");
  };

  const switchToLogin = (): void => {
    setTab("login");
    setPassword("");
  };

  return (
    <div className="w-full max-w-120">
      {/* Mobile-only logo */}
      <div className="flex lg:hidden flex-col items-center mb-8">
        <TmgtLogo size={64} />
        <h1 className="text-textBrand text-xl font-bold mt-2">TripMate</h1>
      </div>

      {/* ── Tab toggle ── */}
      <div className="flex bg-surfaceBaseTertiary rounded-2xl p-1.5 mb-9 gap-1">
        {(["login", "register"] as AuthTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() =>
              t === "login" ? switchToLogin() : switchToRegister()
            }
            className="flex-1 py-3 rounded-[14px] text-[14px] font-semibold transition-all duration-200"
            style={
              tab === t
                ? {
                    background: "var(--color-surfaceBrandPrimary)",
                    color: "var(--color-textOnBrand)",
                    boxShadow: "0 4px 16px rgba(13,115,119,.32)",
                  }
                : { color: "var(--color-textBrand)" }
            }
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      {/* ── Form panel ── */}
      <div className="bg-surfaceBasePrimary rounded-2xl p-8 shadow-sm border border-borderSubtle">
        {tab === "login" ? (
          <LoginForm
            loading={loading}
            onSubmit={handleSubmit}
            onSwitchTab={switchToRegister}
            showPassword={showLoginPw}
            onTogglePassword={() => setShowLoginPw((v) => !v)}
          />
        ) : (
          <RegisterForm
            loading={loading}
            onSubmit={handleSubmit}
            onSwitchTab={switchToLogin}
            showPassword={showRegPw}
            onTogglePassword={() => setShowRegPw((v) => !v)}
            showConfirm={showRegConfirm}
            onToggleConfirm={() => setShowRegConfirm((v) => !v)}
            password={password}
            onPasswordChange={(e) => setPassword(e.target.value)}
            // strength={strength}
          />
        )}
      </div>
    </div>
  );
}
