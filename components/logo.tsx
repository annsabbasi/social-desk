import React from "react";

const OLIVE = "#8A9B38";

interface LogoProps {
  light?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ light = false, className = "", size = "md" }: LogoProps) {
  const ink = light ? "#F7F4EF" : "#1A1714";
  const scales = { sm: 0.72, md: 1, lg: 1.35 };
  const s = scales[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg
        width={Math.round(148 * s)}
        height={Math.round(52 * s)}
        viewBox="0 0 148 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── p ─────────────────────────────────────────────────── */}
        {/* Stem — runs full height including descender */}
        <line x1="9" y1="6" x2="9" y2="46" stroke={ink} strokeWidth="7" strokeLinecap="round" />
        {/* Bowl — D-curve attached to stem, right side only */}
        <path
          d="M 9,6 C 9,6 34,6 34,19 C 34,32 9,32 9,32"
          stroke={ink}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── olive m-wave (pmc bridge) ──────────────────────────── */}
        <path
          d="M 32,19 C 35,4 50,4 57,19 C 64,34 79,4 86,19"
          stroke={OLIVE}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── c ─────────────────────────────────────────────────── */}
        {/* Arc: starting from upper-right, going counter-clockwise, ending lower-right */}
        <path
          d="M 128,8 A 16 16 0 1 0 128,34"
          stroke={ink}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── wordmark ──────────────────────────────────────────── */}
        <text
          x="0"
          y="50"
          fontSize="11"
          fontFamily="system-ui, -apple-system, 'Helvetica Neue', sans-serif"
          letterSpacing="0.06em"
          fontWeight="400"
        >
          <tspan fill={ink}>plan </tspan>
          <tspan fill={OLIVE}>my </tspan>
          <tspan fill={ink}>canvas</tspan>
        </text>
      </svg>
    </div>
  );
}
