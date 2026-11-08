import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import type { MediaAsset } from "@/lib/content/types";

type PageHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  asset: MediaAsset;
  caption: string;
  variant?: "split" | "portrait" | "wide";
  priority?: boolean;
  actions?: ReactNode;
  chips?: ReactNode;
  testId?: string;
};

export function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  asset,
  caption,
  variant = "split",
  priority = false,
  actions,
  chips,
  testId,
}: PageHeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className={clsx("page-hero", `page-hero--${variant}`)} data-testid={testId}>
      <div className="shell page-hero__grid">
        <div className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          {chips ? <div className="page-hero__chips">{chips}</div> : null}
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {actions ? <div className="button-row">{actions}</div> : null}
        </div>

        <div className="page-hero__frame">
          <div className="page-hero__media">
            <Image
              src={asset.src}
              alt={asset.alt[locale]}
              fill
              priority={priority}
              sizes="(max-width: 900px) 100vw, 46vw"
              placeholder="blur"
              blurDataURL={asset.blurDataURL}
              style={{
                objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%`,
              }}
            />
          </div>
          <p className="media-caption page-hero__caption">
            <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
            <span>{caption}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
