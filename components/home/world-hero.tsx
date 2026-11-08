import Image from "next/image";
import Link from "next/link";
import type { LocalizedText } from "@/lib/content/types";
import { getAsset } from "@/lib/content/assets";

import type { Locale } from "@/lib/i18n/config";

interface WorldHeroProps {
  locale: Locale;
  asset: ReturnType<typeof getAsset>;
  variant: "legal" | "stories" | "about" | "studio";
  eyebrow: LocalizedText | string;
  title: LocalizedText | string;
  lead: LocalizedText | string;
  href: string;
}

function pick(value: LocalizedText | string, locale: string): string {
  if (typeof value === "string") return value;
  return locale === "en" ? value.en : value.ar;
}

export function WorldHero({
  locale,
  asset,
  variant,
  eyebrow,
  title,
  lead,
  href,
}: WorldHeroProps) {
  return (
    <article className={`panel panel-gold world-hero world-hero--${variant} reveal`}>
      <div className="world-hero__wrap">
        <div className="world-hero__media media-frame">
          <Image
            src={asset.src}
            alt={pick(asset.alt, locale)}
            width={asset.width}
            height={asset.height}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="world-hero__img"
          />
        </div>
        <div className="world-hero__body">
          <p className="eyebrow eyebrow-gold">{pick(eyebrow, locale)}</p>
          <h3 className="world-hero__title">{pick(title, locale)}</h3>
          <p className="world-hero__lead">{pick(lead, locale)}</p>
          <Link href={href} className="btn btn-ghost">
            {locale === "ar" ? "ادخل العالم" : "Enter the world"}
            <svg className="icon-arrow" viewBox="0 0 24 24" style={{ marginInlineStart: "0.5rem" }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="media-caption">{pick(asset.alt, locale)}</p>
        </div>
      </div>
    </article>
  );
}
