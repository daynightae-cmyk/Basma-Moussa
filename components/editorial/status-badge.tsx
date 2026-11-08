import type { Dictionary } from "@/lib/i18n/dictionary";
import type { PublicationStatus } from "@/lib/content/types";

interface StatusBadgeProps {
  status: PublicationStatus;
  dict: Dictionary;
}

const LABELS: Record<PublicationStatus, keyof Dictionary["status"]> = {
  concept: "conceptShort",
  draft: "draft",
  review: "review",
  published: "published",
  archived: "archived",
};

const VARIANTS: Record<PublicationStatus, string> = {
  concept: "badge--concept",
  draft: "badge--concept",
  review: "badge--concept",
  published: "badge--published",
  archived: "badge--concept",
};

export function StatusBadge({ status, dict }: StatusBadgeProps) {
  const labelKey = LABELS[status];
  const label = dict.status[labelKey];
  return (
    <span className={`badge ${VARIANTS[status]}`} aria-label={label}>
      {label}
    </span>
  );
}
