import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { SoundroomConsole } from "@/components/media/SoundroomConsole";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import { requireProgram } from "@/lib/content/programs";
import { soundroomPageContent } from "@/lib/content/pages/soundroom";
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
  const copy = soundroomPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/soundroom",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-soundroom.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function SoundroomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = soundroomPageContent[locale];
  const program = requireProgram("soundroom");
  const hero = getAsset("bm-01");

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
        testId="soundroom-hero"
        chips={
          <>
            <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
            <StatusBadge tone="unavailable">
              {dict.status.notPublished}
            </StatusBadge>
          </>
        }
        actions={
          <>
            <WhatsAppCta
              locale={locale}
              label={copy.cta.action}
              newTabLabel={dict.common.opensInNewTab}
            />
            <Link
              className="text-link"
              href={localizedPath(locale, "/programs/soundroom")}
            >
              {copy.programLink.cta}
              <ArrowIcon className="arrow" />
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="sound-status-title">
        <div className="shell">
          <div className="two-grid" style={{ alignItems: "start" }}>
            <SoundroomConsole dict={dict} />

            <div className="panel">
              <p className="panel__eyebrow">{copy.absent.eyebrow}</p>
              <h2 id="sound-status-title" className="compact">
                {copy.absent.title}
              </h2>
              <p>{copy.absent.body}</p>
              <div className="status-grid">
                <div className="metric">
                  <span className="metric__value" aria-hidden="true">
                    {copy.absent.metricOne}
                  </span>
                  <span className="metric__label">{copy.absent.metricLabel}</span>
                </div>
              </div>
              <p className="contact-panel__note" style={{ marginBlockStart: "1rem" }}>
                {copy.absent.realPlayerNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="formats-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.formats.eyebrow}</p>
            <h2 id="formats-title">{copy.formats.title}</h2>
            <p className="lead">{copy.formats.lead}</p>
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

      <section className="section" aria-labelledby="gates-title">
        <div className="shell">
          <div className="split split--media-wide">
            <div className="split__copy">
              <p className="eyebrow">{copy.gates.eyebrow}</p>
              <h2 id="gates-title">{copy.gates.title}</h2>
              <ul className="gate-list">
                {program.gates.map((gate) => (
                  <li key={gate.en}>{gate[locale]}</li>
                ))}
              </ul>
              <Link
                className="text-link"
                href={localizedPath(locale, "/programs/soundroom")}
              >
                {copy.programLink.cta}
                <ArrowIcon className="arrow" />
              </Link>
            </div>
            <div className="panel panel--gold">
              <p className="panel__eyebrow">{copy.programLink.title}</p>
              <h3>{program.worldName[locale]}</h3>
              <p>{copy.programLink.body}</p>
              <p className="media-caption" style={{ marginBlockStart: "0.8rem" }}>
                <StatusBadge tone="illustrative">
                  {dict.common.illustrative}
                </StatusBadge>
                {copy.hero.caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="sound-cta-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div className="section-head section-head--split" style={{ marginBlockEnd: 0 }}>
              <div>
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h2 id="sound-cta-title" className="compact">
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
