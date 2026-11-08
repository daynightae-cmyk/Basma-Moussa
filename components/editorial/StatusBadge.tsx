import clsx from "clsx";

export type StatusTone =
  | "concept"
  | "illustrative"
  | "outline"
  | "published"
  | "unavailable";

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
};

export function StatusBadge({ children, tone = "concept", className }: StatusBadgeProps) {
  return (
    <span className={clsx("badge", `badge--${tone}`, className)}>{children}</span>
  );
}

export function statusLabelToTone(status: string): StatusTone {
  if (status === "published") return "published";
  if (status === "archived") return "unavailable";
  if (status === "outline") return "outline";
  return "concept";
}
