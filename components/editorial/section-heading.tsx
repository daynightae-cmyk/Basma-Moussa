import type { LocalizedText } from "@/lib/content/types";

interface SectionHeadingProps {
  eyebrow: LocalizedText | string;
  title: LocalizedText | string;
  lead: LocalizedText | string;
  titleTag?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  titleTag = "h2",
}: SectionHeadingProps) {
  const pick = (value: LocalizedText | string): string =>
    typeof value === "string" ? value : value.ar; // pages render per-locale modules
  return (
    <div className="section-heading reveal">
      <p className="eyebrow eyebrow-gold">{pick(eyebrow)}</p>
      {titleTag === "h1" ? (
        <h1 className="display display-l">{pick(title)}</h1>
      ) : (
        <h2 className="display display-l">{pick(title)}</h2>
      )}
      {lead && <p className="lead">{pick(lead)}</p>}
    </div>
  );
}
