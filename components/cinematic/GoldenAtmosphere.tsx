"use client";

/**
 * Soft gold filament atmosphere for portrait / frequency panels.
 * Decorative only — never presented as audio telemetry.
 */
interface Props {
  variant?: "portrait" | "frequency" | "legal";
  reduced?: boolean;
}

export function GoldenAtmosphere({ variant = "portrait", reduced = false }: Props) {
  return (
    <div
      className={`golden-atmosphere golden-atmosphere--${variant}${reduced ? " is-static" : ""}`}
      aria-hidden="true"
    >
      <span className="golden-atmosphere__line golden-atmosphere__line--a" />
      <span className="golden-atmosphere__line golden-atmosphere__line--b" />
      <span className="golden-atmosphere__line golden-atmosphere__line--c" />
      <span className="golden-atmosphere__glow" />
    </div>
  );
}
