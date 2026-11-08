import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { SourceLink } from "@/components/editorial/SourceLink";
import { MediaFigure } from "@/components/editorial/MediaFigure";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { legalDisclaimer, legalOutlines } from "@/lib/content/legal";
import { getAsset } from "@/lib/content/assets";
import { getSource, officialSources } from "@/lib/content/sources";
import { legalPageContent } from "@/lib/content/pages/legal";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildPageMetadata } from "@/lib/seo";
import type { OfficialSource } from "@/lib/content/types";

const JURISDICTIONS: Record<OfficialSource["jurisdiction"], { ar: string; en: string }> = {
  "UAE-federal": { ar: "الإمارات — اتحادي", en: "UAE — federal" },
  Dubai: { ar: "دبي", en: "Dubai" },
  Sharjah: { ar: "الشارقة", en: "Sharjah" },
  global: { ar: "دولي", en: "Global" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = legalPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/legal-lens",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-legal.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function LegalLensPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = legalPageContent[locale];
  const hero = getAsset("bm-04");
  const dialogueImage = getAsset("bm-03");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        asset={hero}
        caption={copy.hero.caption}
        variant="wide"
        priority
        testId="legal-hero"
        chips={
          <>
            <StatusBadge tone="outline">{dict.status.outline}</StatusBadge>
            <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
          </>
        }
        actions={
          <>
            <Link className="btn btn--gold" href="#sources">
              {copy.sources.eyebrow}
            </Link>
            <Link className="btn btn--ghost" href="#library">
              {copy.library.eyebrow}
            </Link>
          </>
        }
      />

      <section className="section" id="sources" aria-labelledby="sources-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.sources.eyebrow}</p>
            <h2 id="sources-title">{copy.sources.title}</h2>
            <p className="lead">{copy.sources.lead}</p>
          </div>

          <div className="source-grid">
            {officialSources.map((source) => (
              <article className="source-card" key={source.id}>
                <div className="source-card__top">
                  <span className="source-card__publisher">{source.name}</span>
                  <StatusBadge tone="outline">
                    {JURISDICTIONS[source.jurisdiction][locale]}
                  </StatusBadge>
                </div>
                <h3>{source.publisher[locale]}</h3>
                <p>{source.description[locale]}</p>
                <div className="source-card__meta">
                  <span>
                    {copy.sources.checkedLabel}: {source.retrievedAt}
                  </span>
                  <span>
                    {copy.sources.jurisdictionLabel}:{" "}
                    {JURISDICTIONS[source.jurisdiction][locale]}
                  </span>
                </div>
                <SourceLink
                  href={source.url}
                  newTabLabel={dict.common.opensInNewTab}
                  className="source-card__link"
                >
                  {copy.sources.externalLabel}
                </SourceLink>
              </article>
            ))}
          </div>

          <p className="media-caption" style={{ marginBlockStart: "1rem" }}>
            <span className="dot" aria-hidden="true" />
            {copy.sources.noLicenseNote} {copy.sources.apiNote}
          </p>

          <div className="callout" style={{ marginBlockStart: "2rem" }}>
            <strong>{copy.disclaimerTitle}</strong>
            {legalDisclaimer[locale]}
          </div>
        </div>
      </section>

      <section
        className="section section--hairline"
        id="library"
        aria-labelledby="library-title"
      >
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.library.eyebrow}</p>
            <h2 id="library-title">{copy.library.title}</h2>
            <p className="lead">{copy.library.lead}</p>
          </div>

          <div className="two-grid">
            {legalOutlines.map((outline) => (
              <article className="outline-card" key={outline.id}>
                <div className="outline-card__top">
                  <StatusBadge tone="outline">
                    {copy.library.notPublished}
                  </StatusBadge>
                  <span className="meta">{outline.jurisdiction[locale]}</span>
                </div>
                <h3>{outline.title[locale]}</h3>
                <p>{outline.summary[locale]}</p>
                <p className="media-caption">
                  <span className="dot" aria-hidden="true" />
                  {outline.note[locale]}
                </p>
                <div className="outline-card__sources">
                  {outline.sourceIds.map((id) => {
                    const source = getSource(id);
                    return (
                      <SourceLink
                        key={id}
                        href={source.url}
                        newTabLabel={dict.common.opensInNewTab}
                      >
                        {source.publisher[locale]}
                      </SourceLink>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.method.eyebrow}</p>
            <h2 id="method-title">{copy.method.title}</h2>
          </div>
          <div className="method">
            {copy.method.steps.map((step) => (
              <article className="method__step" key={step.number}>
                <span className="method__number" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="dialogue-title">
        <div className="shell">
          <div className="split split--reverse">
            <div className="split__copy">
              <p className="eyebrow">{copy.dialogue.eyebrow}</p>
              <h2 id="dialogue-title">{copy.dialogue.title}</h2>
              <p className="lead">{copy.dialogue.body}</p>
              <div className="callout">
                <strong>{copy.disclaimerTitle}</strong>
                {legalDisclaimer[locale]}
              </div>
            </div>
            <MediaFigure
              asset={dialogueImage}
              locale={locale}
              caption={copy.dialogue.caption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="legal-cta-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div
              className="section-head section-head--split"
              style={{ marginBlockEnd: 0 }}
            >
              <div>
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h2 id="legal-cta-title" className="compact">
                  {copy.cta.title}
                </h2>
                <p className="lead">{copy.cta.body}</p>
              </div>
              <WhatsAppCta
                locale={locale}
                label={copy.cta.action}
                newTabLabel={dict.common.opensInNewTab}
              />
            </div>
          </div>

          <div className="button-row" style={{ marginBlockStart: "1.4rem" }}>
            <Link
              className="text-link"
              href={localizedPath(locale, "/programs/the-legal-lens")}
            >
              {dict.nav.media}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
