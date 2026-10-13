import { logoGeometry as g } from "./logo-geometry";

const palettes = {
  light: { tile: "#0B1F33", letter: "#F8F6F1", stop: "#6FCFC2", text: "#0B1F33", accent: "#0E6B64", muted: "#5B6875" },
  dark: { tile: "#F8F6F1", letter: "#0B1F33", stop: "#0E6B64", text: "#F8F6F1", accent: "#6FCFC2", muted: "#A9B4BF" },
} as const;

interface LogoProps {
  variant?: keyof typeof palettes;
  className?: string;
}

/** Inline wordmark. Decorative by default; wrap in a labelled link where used. */
export function Logo({ variant = "light", className }: LogoProps) {
  const c = palettes[variant];
  return (
    <svg
      viewBox={`0 0 ${g.width} 40`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="scale(1.25)">
        <rect width="32" height="32" rx="7" fill={c.tile} />
        <path fill={c.letter} fillRule="evenodd" d={g.monogramB} />
        <rect x="22.5" y="21.5" width="3.5" height="3.5" fill={c.stop} />
      </g>
      <path fill={c.text} transform={`translate(${g.bnx.x} 30.2)`} d={g.bnx.d} />
      <path fill={c.accent} transform={`translate(${g.n24.x} 30.2)`} d={g.n24.d} />
      <rect x={g.rule.x} y="13" width="1" height="15" fill={c.muted} />
      <path fill={c.muted} transform={`translate(${g.inc.x} 24.4)`} d={g.inc.d} />
    </svg>
  );
}
