import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import type { ProgramWorld } from "@/lib/content/types";
import { programLabels } from "@/lib/content/pages/programs";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

const VARIANT: Record<ProgramWorld["category"], string> = {
  conversation: "chamber",
  legal: "gallery",
  documentary: "waterfront",
  audio: "frequency",
};

export function ProgramHero({
  program,
  locale,
}: {
  program: ProgramWorld;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const labels = programLabels[locale];
  const asset = getAsset(program.heroAssetId);
  const variant = VARIANT[program.category];

  return (
    <section className={clsx("world-hero", `world-hero--${variant}`)}>
      <div className="shell world-hero__grid">
        <div className="world-hero__copy">
          <p className="eyebrow">
            {labels.worldLabel} · {program.worldName[locale]}
          </p>
          <div className="page-hero__chips">
            <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
            <StatusBadge tone="illustrative">{dict.status.illustrative}</StatusBadge>
          </div>
          <h1>{program.title[locale]}</h1>
          <p className="lead">{program.tagline[locale]}</p>
          <p className="world-hero__atmosphere">{program.atmosphere[locale]}</p>
          <div className="button-row">
            <Link
              className="btn btn--gold"
              href={localizedPath(locale, program.experienceHref)}
            >
              {program.experienceLabel[locale]}
              <ArrowIcon className="arrow" />
            </Link>
            <Link className="btn btn--ghost" href={localizedPath(locale, "/media")}>
              {labels.back}
            </Link>
          </div>
        </div>

        <div className="world-hero__frame">
          <div className="world-hero__media">
            <Image
              src={asset.src}
              alt={asset.alt[locale]}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              placeholder="blur"
              blurDataURL={asset.blurDataURL}
              style={{
                objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%`,
              }}
            />
          </div>
          <p className="media-caption world-hero__caption">
            <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
            {labels.heroCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
