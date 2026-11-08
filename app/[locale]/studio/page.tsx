import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import { studioPageContent } from "@/lib/content/pages/studio";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = studioPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/studio",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-media.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = studioPageContent[locale];
  const hero = getAsset("bm-09");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        asset={hero}
        caption={copy.hero.caption}
        variant="split"
        priority
        testId="studio-hero"
        chips={
          <>
            <StatusBadge tone="illustrative">
              {dict.common.illustrative}
            </StatusBadge>
            <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
          </>
        }
        actions={
          <>
            <Link className="btn btn--gold" href={localizedPath(locale, "/media")}>
              {dict.nav.media}
              <ArrowIcon className="arrow" />
            </Link>
            <WhatsAppCta
              locale={locale}
              label={copy.cta.action}
              newTabLabel={dict.common.opensInNewTab}
              variant="ghost"
            />
          </>
        }
      />

      <section className="section" aria-labelledby="disclosure-title">
        <div className="shell">
          <div className="callout">
            <strong>{copy.disclosure.title}</strong>
            {copy.disclosure.body}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.method.eyebrow}</p>
            <h2 id="method-title">{copy.method.title}</h2>
            <p className="lead">{copy.method.lead}</p>
          </div>
          <div className="method">
            {copy.method.steps.map((step) => (
              <article className="method__step" key={step.number}>
                <span className="method__number" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <p className="media-caption">
                  <span className="dot" aria-hidden="true" />
                  {step.gate}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="library-title">
        <div className="shell">
          <div className="split split--media-wide">
            <div className="split__copy">
              <p className="eyebrow">{copy.library.eyebrow}</p>
              <h2 id="library-title">{copy.library.title}</h2>
              <p className="lead">{copy.library.body}</p>
              <div className="panel panel--flat" style={{ padding: "1.2rem 1.4rem" }}>
                <div className="metric">
                  <span className="metric__value" aria-hidden="true">
                    {copy.library.metric}
                  </span>
                  <span className="metric__label">{copy.library.metricLabel}</span>
                </div>
                <p className="media-caption" style={{ marginBlockStart: "0.6rem" }}>
                  <span className="dot" aria-hidden="true" />
                  {copy.library.note}
                </p>
              </div>
              <Link className="text-link" href={localizedPath(locale, "/media")}>
                {dict.nav.media}
                <ArrowIcon className="arrow" />
              </Link>
            </div>
            <div className="empty-state">
              <span className="empty-state__label">{copy.library.eyebrow}</span>
              <h3>{dict.status.notPublished}</h3>
              <p>{copy.hero.caption}</p>
              <StatusBadge tone="illustrative">
                {dict.common.illustrative}
              </StatusBadge>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="studio-cta-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div
              className="section-head section-head--split"
              style={{ marginBlockEnd: 0 }}
            >
              <div>
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h2 id="studio-cta-title" className="compact">
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
        </div>
      </section>
    </>
  );
}
