import type { ReactNode } from "react";
import { ExternalIcon } from "@/components/ui/icons";

export function SourceLink({
  href,
  children,
  newTabLabel,
  className,
}: {
  href: string;
  children: ReactNode;
  newTabLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${typeof children === "string" ? children : ""} (${newTabLabel})`}
    >
      {children}
      <ExternalIcon />
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}
