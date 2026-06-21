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

import { Eye, EyeOff } from "lucide-react";
import { type ChangeEvent, type FormEvent, type ReactNode } from "react";
import AuthLayout from "../lib/components/tmgt/features/auth/auth-layout";

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

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

interface AvatarChip {
  initials: string;
  /** bg inline style — uses CSS variable directly */
  bgVar: string;
  /** text inline style — uses CSS variable directly */
  colorVar: string;
}

interface TmgtLogoProps {
  size?: number;
}

interface InputFieldProps {
  id?: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  icon: ReactNode;
  /** If provided, renders the eye toggle */
  show?: boolean;
  onToggle?: () => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  /** Slot rendered below the input (e.g. strength bar) */
  hint?: ReactNode;
}

interface LoginFormProps {
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

interface RegisterFormProps {
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  showConfirm: boolean;
  onToggleConfirm: () => void;
  password: string;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  strength: PasswordStrength;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const FEATURES: FeatureItem[] = [
  {
    icon: "🗺️",
    title: "Trip Rooms",
    desc: "Create a room for any trip, invite friends with a link or code",
  },
  {
    icon: "🗳️",
    title: "Voting System",
    desc: "Share hotel & bus options — the group votes, top choice wins",
  },
  {
    icon: "💸",
    title: "Expense Splitter",
    desc: "Log who paid what — app auto-calculates who owes whom",
  },
  {
    icon: "⚡",
    title: "Real-time Updates",
    desc: "Every change appears instantly for the whole group",
  },
];

const AVATAR_CHIPS: AvatarChip[] = [
  {
    initials: "RK",
    bgVar: "var(--color-surfaceGreenPrimary)",
    colorVar: "var(--color-textOnBrand)",
  },
  {
    initials: "MH",
    bgVar: "var(--color-surfaceAccentPrimary)",
    colorVar: "var(--color-textOnAccent)",
  },
  {
    initials: "+8",
    bgVar: "var(--color-brand-300)",
    colorVar: "var(--color-brand-900)",
  },
];

const TOPO_Y_VALUES: number[] = [
  80, 145, 210, 278, 346, 415, 484, 554, 625, 696, 768, 840,
];

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

/** Google brand icon */
function GoogleIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

/** Divider row: ──── or ──── */
function OrDivider({ label }: { label: string }): ReactNode {
  return (
    <div className="flex items-center gap-3.5 text-textTertiary text-xs">
      <span className="flex-1 h-px bg-borderSubtle" />
      {label}
      <span className="flex-1 h-px bg-borderSubtle" />
    </div>
  );
}

/** Google SSO button */
function SsoButton({ label }: { label: string }): ReactNode {
  return (
    <button
      type="button"
      className="
        w-full flex items-center justify-center gap-2.5
        py-3.5 rounded-[14px]
        border border-borderDefault bg-surfaceBasePrimary
        text-textSecondary text-sm font-medium
        hover:bg-surfaceBaseSecondary
        transition-colors shadow-sm
      "
    >
      <GoogleIcon />
      {label}
    </button>
  );
}

/** Reusable labelled input with icon + optional eye toggle */
function InputField({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  show,
  onToggle,
  value,
  onChange,
  autoComplete,
  required,
  hint,
}: InputFieldProps): ReactNode {
  const isPassword = onToggle !== undefined;
  const resolvedType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[13px] font-semibold text-textPrimary"
      >
        {label}
      </label>

      <div className="relative">
        {/* Leading icon */}
        <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-textDisabled pointer-events-none">
          {icon}
        </span>

        <input
          id={id}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className="
            w-full pl-[46px] pr-12 py-3.5
            rounded-[14px]
            border border-borderDefault
            bg-surfaceBasePrimary
            text-[15px] text-textPrimary
            placeholder:text-textDisabled
            focus:outline-none
            focus:ring-[3px] focus:ring-surfaceBrandSubtle
            focus:border-borderBrand
            transition-all
          "
        />

        {/* Eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={show ? "Hide password" : "Show password"}
            className="
              absolute right-[14px] top-1/2 -translate-y-1/2
              text-textDisabled hover:text-textTertiary
              transition-colors
            "
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>

      {hint}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────────────────────

function LeftPanel(): ReactNode {
  return (
    <aside
      className="
        hidden lg:flex
        w-[46%] xl:w-[44%] 2xl:w-[42%]
        flex-col justify-between
        p-16 xl:p-20 2xl:p-24
        relative overflow-hidden
      "
      style={{
        background:
          "linear-gradient(145deg, var(--color-brand-900), var(--color-surfaceBrandPrimary) 52%, var(--color-surfaceGreenPrimary))",
      }}
    >
      {/* ── Topographic line decoration ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.055 }}
        viewBox="0 0 560 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {TOPO_Y_VALUES.map((y, i) => (
          <path
            key={y}
            d={`M-30 ${y} Q${140 + i * 5} ${y - 30} 280 ${y + 10} T590 ${y - 15}`}
            fill="none"
            stroke="#fff"
            strokeWidth="1.2"
          />
        ))}
      </svg>

      {/* ── Mountain silhouette ── */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ opacity: 0.12 }}
        viewBox="0 0 560 200"
        aria-hidden="true"
      >
        <polygon
          points="0,200 100,60 190,120 290,15 390,90 480,40 560,80 560,200"
          fill="var(--color-surfaceBaseSecondary)"
        />
      </svg>

      {/* ── Brand block ── */}
      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-12">
          <TmgtLogo size={72} />
          <div>
            <p
              className="text-[11px] font-bold tracking-[.22em] uppercase mb-1"
              style={{ color: "var(--color-surfaceAccentPrimary)" }}
            >
              Group Travel
            </p>
            <h1 className="text-textOnBrand text-[28px] font-extrabold tracking-tight leading-none">
              TripMate
            </h1>
          </div>
        </div>

        <h2 className="text-textOnBrand text-[38px] xl:text-[42px] 2xl:text-[46px] font-extrabold leading-[1.18] tracking-tight mb-5">
          Travel together,
          <br />
          <span style={{ color: "var(--color-surfaceAccentPrimary)" }}>
            settle smarter.
          </span>
        </h2>

        <p
          className="text-[15px] leading-[1.75] max-w-[340px]"
          style={{ color: "var(--color-brand-300)" }}
        >
          Plan group trips, vote on hotel &amp; transport options, and split
          every expense automatically — all inside one shared room.
        </p>
      </div>

      {/* ── Feature list ── */}
      <div className="relative z-10">
        <p
          className="text-[11px] font-bold tracking-[.14em] uppercase mb-6"
          style={{ color: "rgba(255,255,255,.40)" }}
        >
          What&apos;s inside
        </p>

        <ul className="flex flex-col gap-5">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-[13px] flex items-center justify-center text-[19px] shrink-0"
                style={{ background: "rgba(255,255,255,.10)" }}
              >
                {f.icon}
              </div>
              <div>
                <p className="text-textOnBrand text-[14px] font-semibold mb-0.5">
                  {f.title}
                </p>
                <p
                  className="text-[12.5px] leading-[1.55]"
                  style={{ color: "var(--color-brand-300)" }}
                >
                  {f.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Bottom: avatars + copyright ── */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          {/* Overlapping avatar chips */}
          <div className="flex">
            {AVATAR_CHIPS.map((chip, i) => (
              <div
                key={i}
                className="
                  w-[30px] h-[30px] rounded-full
                  border-2 border-white/30
                  flex items-center justify-center
                  text-[10px] font-bold
                  -mr-2 last:mr-0
                "
                style={{ background: chip.bgVar, color: chip.colorVar }}
              >
                {chip.initials}
              </div>
            ))}
          </div>
          <span
            className="text-[12px]"
            style={{ color: "var(--color-brand-300)" }}
          >
            Trusted by adventurers already planning
          </span>
        </div>

        <p style={{ color: "rgba(255,255,255,.35)", fontSize: "11px" }}>
          © 2025 TripMate · Group Travel Expense &amp; Booking Manager
        </p>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGIN FORM
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// REGISTER FORM
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// PAGE — ROOT COMPONENT
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
