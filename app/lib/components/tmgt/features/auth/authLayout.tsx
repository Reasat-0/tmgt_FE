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

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

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
// PAGE — ROOT COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
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
