import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { MediaFigure } from "@/components/editorial/MediaFigure";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import {
  getProgram,
  programSlugs,
  programs,
} from "@/lib/content/programs";
import { programLabels } from "@/lib/content/pages/programs";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildPageMetadata } from "@/lib/seo";
import type { ProgramCategory } from "@/lib/content/types";
import type { Metadata } from "next";

const OG_BY_CATEGORY: Record<ProgramCategory, string> = {
  conversation: "/brand/og-beyond.jpg",
  legal: "/brand/og-legal.jpg",
  documentary: "/brand/og-city.jpg",
  audio: "/brand/og-soundroom.jpg",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const program = getProgram(slug);
  if (!program) return {};
  return buildPageMetadata({
    locale,
    path: `/programs/${program.slug}`,
    title: `${program.title[locale]} — ${program.worldName[locale]}`,
    description: program.tagline[locale],
    image: OG_BY_CATEGORY[program.category],
    imageAlt: program.atmosphere[locale],
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const program = getProgram(slug);
  if (!program) notFound();

  const dict = getDictionary(locale);
  const labels = programLabels[locale];
  const secondaryAsset = getAsset(program.secondaryAssetId);
  const otherPrograms = programs.filter((item) => item.slug !== program.slug);

  return (
    <div className={`world-page world-page--${program.category}`}>
      <ProgramHero program={program} locale={locale} />

      <section className="world-quote" aria-label={labels.quoteLabel}>
        <figure>
          <blockquote>{program.quote[locale]}</blockquote>
          <figcaption>{labels.quoteLabel}</figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="world-intro-title">
        <div className="shell">
          <div className="split split--media-wide">
            <div className="split__copy">
              <p className="eyebrow">
                {labels.worldLabel} · {program.worldName[locale]}
              </p>
              <h2 id="world-intro-title">{labels.introductionHeading}</h2>
              <p className="lead">{program.introduction[locale]}</p>
              <p className="media-caption">
                <StatusBadge tone="illustrative">
                  {dict.common.illustrative}
                </StatusBadge>
                {labels.heroCaption}
              </p>
            </div>
            <MediaFigure
              asset={secondaryAsset}
              locale={locale}
              caption={labels.heroCaption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="formats-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{program.worldName[locale]}</p>
            <h2 id="formats-title">{labels.formatsHeading}</h2>
            <p className="lead">{labels.formatsLead}</p>
          </div>
          <div className="format-grid">
            {program.formats.map((format) => (
              <article className="format-card" key={format.title.en}>
                <h3>{format.title[locale]}</h3>
                <p>{format.body[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="status-title">
        <div className="shell">
          <div className="two-grid">
            <div className="panel panel--gold">
              <p className="panel__eyebrow">{labels.statusHeading}</p>
              <div className="page-hero__chips" style={{ marginBlockEnd: "0.9rem" }}>
                <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
                <StatusBadge tone="unavailable">
                  {dict.status.notPublished}
                </StatusBadge>
              </div>
              <h2 id="status-title" className="compact">
                {labels.statusLabel}
              </h2>
              <p>{program.statusNote[locale]}</p>
            </div>

            <div className="panel panel--flat">
              <p className="panel__eyebrow">{labels.gatesHeading}</p>
              <p style={{ marginBlockEnd: "0.9rem" }}>{labels.gatesLead}</p>
              <ul className="gate-list">
                {program.gates.map((gate) => (
                  <li key={gate.en}>{gate[locale]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="episodes-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{labels.episodesHeading}</p>
            <h2 id="episodes-title" className="compact">
              {dict.status.notPublished}
            </h2>
          </div>
          <div className="empty-state">
            <span className="empty-state__label">
              {labels.episodesHeading} · 00
            </span>
            <h3>{labels.episodesEmptyTitle}</h3>
            <p>{labels.episodesEmptyBody}</p>
            <Link
              className="text-link"
              href={localizedPath(locale, program.experienceHref)}
            >
              {program.experienceLabel[locale]}
              <ArrowIcon className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="related-title">
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">{labels.worldLabel}</p>
              <h2 id="related-title">{labels.relatedHeading}</h2>
            </div>
            <Link className="text-link" href={localizedPath(locale, "/media")}>
              {dict.common.backToUniverse}
              <ArrowIcon className="arrow" />
            </Link>
          </div>

          <div className="program-switcher">
            {otherPrograms.map((item) => (
              <Link
                key={item.slug}
                className="program-switch"
                href={localizedPath(locale, `/programs/${item.slug}`)}
              >
                <span>{item.worldName[locale]}</span>
                <strong>{item.title[locale]}</strong>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
