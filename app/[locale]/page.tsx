import { Metadata } from "next";
import Image from "next/image";

import { HOME_CONTENT } from "@/lib/content/pages/home";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { MediaFrame } from "@/components/editorial/media-frame";
import { SectionHeading } from "@/components/editorial/section-heading";
import { ProvenanceCaption } from "@/components/editorial/provenance-caption";
import { PortalLink } from "@/components/navigation/portal-link";
import { ReplayIntroButton } from "@/components/brand/replay-intro-button";
import { WorldHero } from "@/components/home/world-hero";
import { PORTAL_WORLDS } from "@/lib/content/worlds";
import { whatsappHref } from "@/lib/site";
import { CinematicHeroSlider } from "@/components/cinematic/CinematicHeroSlider";
import { HorizontalStoryStage } from "@/components/cinematic/HorizontalStoryStage";
import { ThreadInvitation } from "@/components/cinematic/thread-invitation";
import { HOME_STORY_PANELS } from "@/lib/experience/scene-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = HOME_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.media}`,
    description: c.lead,
    imageAlt: getAsset("bm-14").alt[l],
  });
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({
  params,
  searchParams,
}: HomePageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  const { replay } = await searchParams;
  const c = HOME_CONTENT[l];
  const dict = getDictionary(l);
  const showReplay = Array.isArray(replay) ? replay.includes("1") : replay === "1";

  const worldCard = (world: (typeof PORTAL_WORLDS)[number]) => {
      const asset = getAsset(world.assetId);
      const isLarge = world.variant === "wide";
      return (
        <PortalLink
          key={world.id}
          href={localizedPath(l, world.href)}
          doorImage={asset.src}
          doorLabel={world.title[l]}
          className={`portal-card world-card ${isLarge ? "world--large" : ""}`}
          media={
            <Image
              src={asset.src}
              alt={asset.alt[l]}
              width={asset.width}
              height={asset.height}
              sizes="(max-width: 768px) 100vw, 48vw"
              loading="lazy"
              className="portal-card__img"
            />
          }
          body={
            <>
              <div className="portal-card__meta">
                <span className="portal-card__status status--concept">
                  {dict.common.concept}
                </span>
                <span className="portal-card__provenance">
                  {dict.common.illustrativeShort}
                </span>
              </div>
              <p className="portal-card__kicker">{world.kicker[l]}</p>
              <h3 className="portal-card__title">{world.title[l]}</h3>
              <p className="portal-card__teaser">{world.teaser[l]}</p>
              <span className="portal-card__cta">
                {dict.common.enterWorld}
                <svg className="icon-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </>
          }
        />
      );
    };

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <ReplayIntroButton dict={dict} />
      {showReplay && <p className="sr-only">{dict.common.replayIntro}</p>}

      {/* Cinematic Hero Slider - replaces static hero */}
      <CinematicHeroSlider locale={l} dict={dict} />

      <section className="chapter" id="intro">
        <div className="shell grid-uneven">
          <div className="intro__text reveal">
            <SectionHeading
              eyebrow={c.introEyebrow}
              title={c.introTitle}
              lead={c.introBody}
              titleTag="h1"
            />
          </div>
          <div className="intro__pillars">
            {c.pillars.map((p) => (
              <div key={p.title} className="panel pillar reveal-delay">
                <p className="pillar__title">{p.title}</p>
                <p className="pillar__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five connected full-viewport chapters, vertical scroll drives horizontal camera travel. */}
      <HorizontalStoryStage
        locale={l}
        panels={HOME_STORY_PANELS}
        ariaLabel={l === "ar" ? "رحلة بصرية عبر عوالم بسمة موسى" : "A cinematic journey through Basma Moussa media worlds"}
      />

      <ThreadInvitation locale={l} dict={dict} />

      <section className="chapter chapter--tight worlds" id="worlds">
        <div className="shell">
          <SectionHeading
            eyebrow={c.worldsSection.eyebrow}
            title={c.worldsSection.title}
            lead={c.worldsSection.lead}
          />
          <div className="grid-uneven grid-uneven--worlds">
            {PORTAL_WORLDS.map(worldCard)}
          </div>
          <ProvenanceCaption
            text={
              l === "ar"
                ? "كل الصور في العوالم تصوّر توضيحي للهوية البصرية، وليست توثيقًا لمساحات حقيقية."
                : "All world images illustrate the brand identity — they are not documentation of real places."
            }
          />
        </div>
      </section>

      <section className="chapter strips">
        <div className="shell grid-uneven strips__grid">
          <WorldHero
            locale={l}
            asset={getAsset("bm-06")}
            variant="legal"
            eyebrow={c.legalSection.eyebrow}
            title={c.legalSection.title}
            lead={c.legalSection.lead}
            href={localizedPath(l, "/legal-lens")}
          />
          <WorldHero
            locale={l}
            asset={getAsset("bm-13")}
            variant="stories"
            eyebrow={c.storiesSection.eyebrow}
            title={c.storiesSection.title}
            lead={c.storiesSection.lead}
            href={localizedPath(l, "/stories")}
          />
          <WorldHero
            locale={l}
            asset={getAsset("bm-02")}
            variant="about"
            eyebrow={c.aboutSection.eyebrow}
            title={c.aboutSection.title}
            lead={c.aboutSection.lead}
            href={localizedPath(l, "/about")}
          />
          <WorldHero
            locale={l}
            asset={getAsset("bm-09")}
            variant="studio"
            eyebrow={c.studioSection.eyebrow}
            title={c.studioSection.title}
            lead={c.studioSection.lead}
            href={localizedPath(l, "/studio")}
          />
        </div>
      </section>

      <section className="chapter chapter--tight journey" id="journey">
        <div className="shell">
          <div className="journey__inner grid-uneven">
            {c.journey.map((step) => (
              <div key={step.title} className="journey__step reveal-delay">
                <span className="journey__label">{step.label}</span>
                <h3 className="journey__title">{step.title}</h3>
                <p className="journey__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="chapter chapter--tight contact-strip"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="shell grid-uneven contact-strip__inner">
          <MediaFrame
            src={getAsset("bm-10").src}
            alt={getAsset("bm-10").alt[l]}
            width={getAsset("bm-10").width}
            height={getAsset("bm-10").height}
            sizes="(max-width: 768px) 100vw, 44vw"
            className="contact-strip__frame"
          />
          <div className="contact-strip__body reveal">
            <SectionHeading
              eyebrow={c.contact.eyebrow}
              title={c.contact.title}
              lead={c.contact.lead}
            />
            <a
              href={whatsappHref(l)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              {dict.common.explore} · WhatsApp
              <svg
                className="icon-arrow"
                viewBox="0 0 24 24"
                style={{ marginInlineStart: "0.5rem" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="media-caption">
              {dict.common.externalLink} · {dict.common.opensInNewTab}
            </p>
            <p className="media-caption contact-strip__note">
              {dict.common.noForm}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}