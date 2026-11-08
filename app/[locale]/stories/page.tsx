import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { getAsset } from "@/lib/content/assets";
import { storiesPageContent } from "@/lib/content/pages/stories";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = storiesPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/stories",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-stories.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = storiesPageContent[locale];
  const hero = getAsset("bm-13");

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
        testId="stories-hero"
        chips={
          <>
            <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
            <StatusBadge tone="unavailable">{dict.status.notPublished}</StatusBadge>
          </>
        }
        actions={
          <WhatsAppCta
            locale={locale}
            label={copy.cta.action}
            newTabLabel={dict.common.opensInNewTab}
          />
        }
      />

      <section className="section" aria-labelledby="archive-status-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.status.eyebrow}</p>
            <h2 id="archive-status-title">{copy.status.title}</h2>
            <p className="lead">{copy.status.body}</p>
          </div>

          <div className="panel panel--gold">
            <div className="status-grid" style={{ marginBlockStart: 0 }}>
              <div className="metric">
                <span className="metric__value" aria-hidden="true">
                  {copy.status.metric}
                </span>
                <span className="metric__label">{copy.status.metricLabel}</span>
              </div>
              <div className="metric">
                <span className="metric__value" aria-hidden="true">
                  {copy.status.metricSecondary}
                </span>
                <span className="metric__label">
                  {copy.status.metricSecondaryLabel}
                </span>
              </div>
            </div>
            <p className="media-caption" style={{ marginBlockStart: "1rem" }}>
              <span className="dot" aria-hidden="true" />
              {copy.status.note}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="lanes-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.lanes.eyebrow}</p>
            <h2 id="lanes-title">{copy.lanes.title}</h2>
            <p className="lead">{copy.lanes.lead}</p>
          </div>
          <div className="four-grid">
            {copy.lanes.items.map((lane, index) => (
              <article className="pillar" key={lane.title}>
                <span className="pillar__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{lane.title}</h3>
                <p>{lane.body}</p>
                <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="policy-title">
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">{copy.policy.eyebrow}</p>
              <h2 id="policy-title">{copy.policy.title}</h2>
            </div>
            <p className="section-head__aside">{copy.policy.note}</p>
          </div>
          <div className="method method--stacked">
            {copy.policy.items.map((item, index) => (
              <article className="method__step" key={item}>
                <span className="method__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="stories-cta-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div
              className="section-head section-head--split"
              style={{ marginBlockEnd: 0 }}
            >
              <div>
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h2 id="stories-cta-title" className="compact">
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
