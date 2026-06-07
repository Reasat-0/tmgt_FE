// ─────────────────────────────────────────────────────────────
// LOGIN FORM
// ─────────────────────────────────────────────────────────────

import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { ReactNode, SubmitEvent } from "react";
import { TmgtInput } from "../../../base-components/tmgt-input";

interface LoginFormProps {
  loading: boolean;
  onSubmit: (e: SubmitEvent) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export function LoginForm({
  loading,
  onSubmit,
  onSwitchTab,
  showPassword,
  onTogglePassword,
}: LoginFormProps): ReactNode {
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Heading */}
      <div className="mb-2">
        <h2 className="text-textPrimary text-[28px] font-extrabold tracking-tight mb-1.5">
          Welcome back 👋
        </h2>
        <p className="text-textSecondary text-sm">
          Sign in to access your trip dashboard
        </p>
      </div>

      {/* Google SSO */}
      {/* <SsoButton label="Continue with Google" />

      <OrDivider label="or sign in with email" /> */}

      {/* Email */}
      <TmgtInput
        id="login-email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={17} />}
        autoComplete="email"
        required
      />

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <TmgtInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            label="Password*"
            icon={<Lock size={17} />}
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-textBrand text-[12px] font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <input
          id="remember-me"
          type="checkbox"
          className="w-4 h-4 cursor-pointer accent-[color:var(--color-surfaceBrandPrimary)]"
        />
        <label
          htmlFor="remember-me"
          className="text-[13px] text-textSecondary cursor-pointer"
        >
          Remember me for 30 days
        </label>
      </div>

      {/* CTA */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2
          py-4 rounded-[14px]
          text-textOnBrand text-[15px] font-bold
          transition-all hover:opacity-90 active:scale-[.985]
          disabled:opacity-60 disabled:cursor-not-allowed
        "
        style={{
          background:
            "linear-gradient(135deg, var(--color-surfaceBrandPrimary), var(--color-surfaceGreenPrimary))",
          boxShadow: "0 6px 20px rgba(13,115,119,.35)",
        }}
      >
        {loading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Switch */}
      <p className="text-center text-sm text-textSecondary">
        No account yet?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="text-textBrand font-semibold hover:underline"
        >
          Create one free
        </button>
      </p>
    </form>
  );
}
