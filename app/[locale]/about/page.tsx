import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { MediaFigure } from "@/components/editorial/MediaFigure";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import { aboutPageContent } from "@/lib/content/pages/about";
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
  const copy = aboutPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/about",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-about.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = aboutPageContent[locale];
  const hero = getAsset("bm-02");
  const secondary = getAsset("bm-05");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        asset={hero}
        caption={copy.hero.caption}
        variant="portrait"
        priority
        testId="about-hero"
        chips={
          <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
        }
        actions={
          <>
            <WhatsAppCta
              locale={locale}
              label={copy.cta.action}
              newTabLabel={dict.common.opensInNewTab}
            />
            <Link className="btn btn--ghost" href={localizedPath(locale, "/media")}>
              {dict.nav.media}
              <ArrowIcon className="arrow" />
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="story-title">
        <div className="shell">
          <div className="split split--media-wide">
            <div className="split__copy">
              <p className="eyebrow">{copy.story.eyebrow}</p>
              <h2 id="story-title">{copy.story.title}</h2>
              <div className="prose">
                {copy.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <MediaFigure
              asset={secondary}
              locale={locale}
              variant="portrait"
              caption={copy.secondaryCaption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="focus-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.focus.eyebrow}</p>
            <h2 id="focus-title">{copy.focus.title}</h2>
          </div>
          <div className="three-grid">
            {copy.focus.items.map((item, index) => (
              <article className="pillar" key={item.title}>
                <span className="pillar__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="world-quote" aria-label={copy.quote.label}>
        <figure>
          <blockquote>{copy.quote.text}</blockquote>
          <figcaption>{copy.quote.label}</figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="accuracy-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.accuracy.eyebrow}</p>
            <h2 id="accuracy-title">{copy.accuracy.title}</h2>
            <p className="lead">{copy.accuracy.body}</p>
          </div>

          <div className="accuracy">
            <div className="accuracy__column">
              <h3>{copy.accuracy.knownTitle}</h3>
              <ul>
                {copy.accuracy.knownItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="accuracy__column">
              <h3>{copy.accuracy.pendingTitle}</h3>
              <ul>
                {copy.accuracy.pendingItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="about-cta-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div
              className="section-head section-head--split"
              style={{ marginBlockEnd: 0 }}
            >
              <div>
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h2 id="about-cta-title" className="compact">
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
