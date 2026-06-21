import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { ChangeEvent, ReactNode, SubmitEvent } from "react";
import { TmgtInput } from "../../base-components/tmgt-input";

interface RegisterFormProps {
  loading: boolean;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  showConfirm: boolean;
  onToggleConfirm: () => void;
  password: string;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // strength: PasswordStrength;
}

export function RegisterForm({
  loading,
  onSubmit,
  onSwitchTab,
  showPassword,
  onTogglePassword,
  showConfirm,
  onToggleConfirm,
  password,
  onPasswordChange,
  // strength,
}: RegisterFormProps): ReactNode {
  /** Strength bar — 4 segments */
  // const StrengthBar: ReactNode = password ? (
  //   <div className="mt-2 space-y-1.5">
  //     <div className="flex gap-1">
  //       {([1, 2, 3, 4] as const).map((n) => (
  //         <div
  //           key={n}
  //           className={`flex-1 h-[3px] rounded-full transition-all duration-300 ${
  //             n <= strength.score ? strength.barClass : "bg-borderSubtle"
  //           }`}
  //         />
  //       ))}
  //     </div>
  //     <p className={`text-[11px] font-medium ${strength.textClass}`}>
  //       {strength.label}
  //     </p>
  //   </div>
  // ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Heading */}
      <div className="mb-2">
        <h2 className="text-textPrimary text-[28px] font-extrabold tracking-tight mb-1.5">
          Start your journey 🗺️
        </h2>
        <p className="text-textSecondary text-sm">
          Free account — no credit card needed
        </p>
      </div>

      {/* Google SSO */}
      {/* <SsoButton label="Sign up with Google" />

      <OrDivider label="or register with email" /> */}

      {/* Name — 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <TmgtInput
          id="reg-first"
          label="First name"
          placeholder="Rahim"
          icon={<User size={17} />}
          autoComplete="given-name"
          required
        />
        <TmgtInput
          id="reg-last"
          label="Last name"
          placeholder="Uddin"
          icon={<User size={17} />}
          autoComplete="family-name"
          required
        />
      </div>

      {/* Email */}
      <TmgtInput
        id="reg-email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail size={17} />}
        autoComplete="email"
        required
      />

      {/* Password + Confirm — 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <TmgtInput
          id="reg-password"
          label="Password"
          type="password"
          placeholder="Min. 8 chars"
          icon={<Lock size={17} />}
          // show={showPassword}
          onToggle={onTogglePassword}
          value={password}
          onChange={onPasswordChange}
          autoComplete="new-password"
          required
          // hint={StrengthBar}
        />
        <TmgtInput
          id="reg-confirm"
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          icon={<Lock size={17} />}
          // show={showConfirm}
          onToggle={onToggleConfirm}
          autoComplete="new-password"
          required
        />
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3 bg-surfaceBasePrimary p-4 rounded-[14px] border border-borderDefault">
        <input
          id="terms"
          type="checkbox"
          required
          className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer accent-[color:var(--color-surfaceBrandPrimary)]"
        />
        <label
          htmlFor="terms"
          className="text-[13px] text-textSecondary leading-relaxed cursor-pointer"
        >
          I agree to TripMate&apos;s{" "}
          <span className="text-textBrand font-semibold hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and acknowledge the{" "}
          <span className="text-textBrand font-semibold hover:underline cursor-pointer">
            Privacy Policy
          </span>
          . I understand my group trip data is stored securely.
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
            Creating account…
          </>
        ) : (
          <>
            Create Account <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Switch */}
      <p className="text-center text-sm text-textSecondary">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="text-textBrand font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
