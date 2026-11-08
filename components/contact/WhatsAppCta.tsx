import Link from "next/link";
import clsx from "clsx";
import { ExternalIcon } from "@/components/ui/icons";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { whatsappHref } from "@/lib/site";

type WhatsAppCtaProps = {
  locale: Locale;
  label: string;
  newTabLabel: string;
  className?: string;
  variant?: "gold" | "ghost";
};

export function WhatsAppCta({
  locale,
  label,
  newTabLabel,
  className,
  variant = "gold",
}: WhatsAppCtaProps) {
  return (
    <a
      className={clsx("btn", variant === "gold" ? "btn--gold" : "btn--ghost", className)}
      href={whatsappHref(locale)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <ExternalIcon className="arrow" />
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}

export function ContactLink({
  locale,
  label,
  className,
  variant = "ghost",
}: {
  locale: Locale;
  label: string;
  className?: string;
  variant?: "gold" | "ghost";
}) {
  return (
    <Link
      className={clsx("btn", variant === "gold" ? "btn--gold" : "btn--ghost", className)}
      href={localizedPath(locale, "/contact")}
    >
      {label}
    </Link>
  );
}
