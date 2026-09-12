// ─────────────────────────────────────────────────────────────
// LOGIN FORM
// ─────────────────────────────────────────────────────────────

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { ReactNode, SubmitEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { TmgtButton } from "../../base-components/tmgt-button";
import { TmgtInput } from "../../base-components/tmgt-input";

interface LoginFormProps {
  loading: boolean;
  onSubmit: (e: SubmitEvent) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Must be of 6 characters or more" }),
});

export function LoginForm({
  loading,
  onSubmit,
  onSwitchTab,
  showPassword,
  onTogglePassword,
}: LoginFormProps): ReactNode {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit } = loginForm;

  const onSubmitLogin = (data: z.infer<typeof loginSchema>) => {
    // Handle login form submission
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLogin)}
      noValidate
      className="flex flex-col gap-5"
    >
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

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TmgtInput
            {...field}
            id="login-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={17} />}
            autoComplete="email"
            required
            error={error?.message}
          />
        )}
      />

      {/* Password */}

      <div className="flex flex-col gap-2">
        <div className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <TmgtInput
                {...field}
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                label="Password*"
                icon={<Lock size={17} />}
                error={error?.message}
              />
            )}
          />

          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              className="text-textBrand text-xs font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <TmgtButton
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
      </TmgtButton>

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
