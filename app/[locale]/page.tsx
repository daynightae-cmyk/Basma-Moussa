import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { BrandThreadSplash } from "@/components/brand/BrandThreadSplash";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { MediaFigure } from "@/components/editorial/MediaFigure";
import { PortalGrid } from "@/components/navigation/PortalGrid";
import { ArrowIcon } from "@/components/ui/icons";
import { ContactLink, WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { getAsset, HOME_HERO } from "@/lib/content/assets";
import { programs } from "@/lib/content/programs";
import { portalWorlds } from "@/lib/content/worlds";
import { homeContent } from "@/lib/content/pages/home";
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
  const copy = homeContent[locale];

  return buildPageMetadata({
    locale,
    path: "/",
    title:
      locale === "ar"
        ? "بسمة موسى — عالم الإعلام"
        : "Basma Moussa — Media Universe",
    description: copy.hero.lead,
    image: "/brand/og-home.jpg",
    imageAlt: copy.hero.caption,
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = homeContent[locale];

  const legalAsset = getAsset("bm-03");
  const archiveAsset = getAsset("bm-13");
  const aboutAsset = getAsset("bm-02");
  const studioAsset = getAsset("bm-09");
  const contactAsset = getAsset("bm-08");
  const totalEpisodes = programs.reduce(
    (total, program) => total + program.episodeIds.length,
    0,
  );

  return (
    <>
      <BrandThreadSplash locale={locale} />

      <section
        className="home-hero"
        style={{ "--hero-focal": `${HOME_HERO.focalPoint.x}%` } as CSSProperties}
        aria-labelledby="home-title"
      >
        <div className="home-hero__media">
          <Image
            src={HOME_HERO.src}
            alt={HOME_HERO.alt[locale]}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HOME_HERO.blurDataURL}
            style={{
              objectPosition: `${HOME_HERO.focalPoint.x}% ${HOME_HERO.focalPoint.y}%`,
            }}
          />
        </div>
        <div className="shell home-hero__grid">
          <div className="home-hero__rail" aria-hidden="true">
            <span className="home-hero__rail-mark">BM</span>
            <span className="home-hero__rail-line" />
            <span className="home-hero__rail-note">Sharjah · UAE</span>
          </div>
          <div className="home-hero__content">
            <p className="home-hero__chapter">
              <span>01</span>
              <span aria-hidden="true" className="line" />
              <span>{locale === "ar" ? "الصوت الأول" : "The First Voice"}</span>
            </p>
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="home-title">{copy.hero.title}</h1>
            <p className="lead">{copy.hero.lead}</p>
            <div className="button-row">
              <Link className="btn btn--gold" href={localizedPath(locale, "/media")}>
                {copy.hero.primaryCta}
                <ArrowIcon className="arrow" />
              </Link>
              <ContactLink
                locale={locale}
                label={copy.hero.secondaryCta}
                variant="ghost"
              />
            </div>
            <p className="home-hero__status">{copy.hero.status}</p>
            <p className="home-hero__scroll" aria-hidden="true">
              <span />
              {copy.hero.scroll}
            </p>
          </div>
        </div>
        <p className="media-caption home-hero__caption">
          <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
          {copy.hero.caption}
        </p>
      </section>

      <section className="section" id="vision" aria-labelledby="vision-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h2 id="vision-title">{copy.intro.title}</h2>
          </div>

          <div className="intro-stage reveal">
            <p className="intro-stage__lead">{copy.intro.body}</p>
            <div className="intro-stage__meta">
              <StatusBadge tone="concept">{copy.intro.note}</StatusBadge>
            </div>
          </div>

          <div className="three-grid" style={{ marginBlockStart: "1rem" }}>
            {copy.intro.pillars.map((pillar, index) => (
              <article className="pillar reveal" key={pillar.title}>
                <span className="pillar__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--hairline"
        id="worlds"
        aria-labelledby="worlds-title"
      >
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">{copy.portals.eyebrow}</p>
              <h2 id="worlds-title">{copy.portals.title}</h2>
              <p className="lead">{copy.portals.lead}</p>
            </div>
            <p className="section-head__aside">{copy.portals.note}</p>
          </div>

          <PortalGrid locale={locale} worlds={portalWorlds} prioritizeFirst />

          <div className="button-row" style={{ marginBlockStart: "1.8rem" }}>
            <Link className="text-link" href={localizedPath(locale, "/media")}>
              {dict.nav.media}
              <ArrowIcon className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="legal-title">
        <div className="shell">
          <div className="split split--reverse">
            <div className="split__copy">
              <p className="eyebrow">{copy.legal.eyebrow}</p>
              <h2 id="legal-title">{copy.legal.title}</h2>
              <p className="lead">{copy.legal.body}</p>
              <Link
                className="text-link"
                href={localizedPath(locale, "/legal-lens")}
              >
                {copy.legal.cta}
                <ArrowIcon className="arrow" />
              </Link>
            </div>
            <MediaFigure
              asset={legalAsset}
              locale={locale}
              caption={copy.legal.caption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="archive-title">
        <div className="shell">
          <div className="split">
            <div className="split__copy">
              <p className="eyebrow">{copy.archive.eyebrow}</p>
              <h2 id="archive-title">{copy.archive.title}</h2>
              <p className="lead">{copy.archive.body}</p>
              <Link className="text-link" href={localizedPath(locale, "/stories")}>
                {copy.archive.cta}
                <ArrowIcon className="arrow" />
              </Link>
            </div>
            <MediaFigure
              asset={archiveAsset}
              locale={locale}
              caption={copy.archive.caption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="shell">
          <div className="split split--media-wide">
            <div className="split__copy">
              <p className="eyebrow">{copy.about.eyebrow}</p>
              <h2 id="about-title">{copy.about.title}</h2>
              <p className="lead">{copy.about.body}</p>
              <Link className="text-link" href={localizedPath(locale, "/about")}>
                {copy.about.cta}
                <ArrowIcon className="arrow" />
              </Link>
            </div>
            <MediaFigure
              asset={aboutAsset}
              locale={locale}
              variant="portrait"
              caption={copy.about.caption}
              className="split__figure reveal"
            />
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="studio-title">
        <div className="shell">
          <div className="studio-band">
            <div className="studio-band__media">
              <Image
                src={studioAsset.src}
                alt={studioAsset.alt[locale]}
                fill
                sizes="(max-width: 900px) 100vw, 62vw"
                placeholder="blur"
                blurDataURL={studioAsset.blurDataURL}
                style={{
                  objectPosition: `${studioAsset.focalPoint.x}% ${studioAsset.focalPoint.y}%`,
                }}
              />
            </div>
            <div className="studio-band__panel">
              <p className="eyebrow">{copy.studio.eyebrow}</p>
              <h2 id="studio-title">{copy.studio.title}</h2>
              <p>{copy.studio.body}</p>
              <div className="button-row">
                <Link
                  className="btn btn--ghost"
                  href={localizedPath(locale, "/studio")}
                >
                  {copy.studio.cta}
                  <ArrowIcon className="arrow" />
                </Link>
              </div>
              <p className="media-caption">
                <StatusBadge tone="illustrative">
                  {dict.common.illustrative}
                </StatusBadge>
                {locale === "ar"
                  ? "مكتب إنتاج تصوري — ليس منشأة مملوكة."
                  : "Illustrative production desk — not an owned venue."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="facts-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div className="section-head" style={{ marginBlockEnd: "0.5rem" }}>
              <p className="eyebrow">{copy.facts.eyebrow}</p>
              <h2 id="facts-title" className="compact">
                {copy.facts.title}
              </h2>
              <p className="lead">{copy.facts.body}</p>
            </div>
            <div className="status-grid">
              {copy.facts.items.map((item, index) => (
                <div className="metric" key={item.label}>
                  <span className="metric__value" aria-hidden="true">
                    {index === 1 ? String(totalEpisodes).padStart(2, "0") : item.value}
                  </span>
                  <span className="metric__label">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="media-caption" style={{ marginBlockStart: "1rem" }}>
              <span className="dot" aria-hidden="true" />
              {copy.facts.note}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="journey-title">
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">{copy.journey.eyebrow}</p>
              <h2 id="journey-title">{copy.journey.title}</h2>
              <p className="lead">{copy.journey.lead}</p>
            </div>
            <p className="section-head__aside">{copy.journey.note}</p>
          </div>
          <div className="journey">
            {copy.journey.steps.map((step) => (
              <article className="journey__step" key={step.number}>
                <span className="journey__number" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="shell">
          <div className="contact-panel">
            <div className="contact-panel__copy">
              <p className="eyebrow">{copy.contact.eyebrow}</p>
              <h2 id="contact-title">{copy.contact.title}</h2>
              <p className="lead">{copy.contact.body}</p>
              <div className="button-row">
                <WhatsAppCta
                  locale={locale}
                  label={copy.contact.cta}
                  newTabLabel={dict.common.opensInNewTab}
                />
                <Link
                  className="text-link"
                  href={localizedPath(locale, "/contact")}
                >
                  {dict.nav.contact}
                  <ArrowIcon className="arrow" />
                </Link>
              </div>
              <p className="contact-panel__note">{copy.contact.note}</p>
            </div>
            <figure className="contact-panel__figure">
              <div className="contact-panel__media">
                <Image
                  src={contactAsset.src}
                  alt={contactAsset.alt[locale]}
                  fill
                  sizes="(max-width: 820px) 100vw, 34vw"
                  placeholder="blur"
                  blurDataURL={contactAsset.blurDataURL}
                  style={{
                    objectPosition: `${contactAsset.focalPoint.x}% ${contactAsset.focalPoint.y}%`,
                  }}
                />
              </div>
              <figcaption className="media-caption">
                <StatusBadge tone="illustrative">
                  {dict.common.illustrative}
                </StatusBadge>
                {copy.contact.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
