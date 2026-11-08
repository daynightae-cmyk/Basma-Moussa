import { Metadata } from "next";

import { LEGAL_CONTENT } from "@/lib/content/pages/legal";
import { LEGAL_OUTLINES } from "@/lib/content/legal";
import { OFFICIAL_SOURCES } from "@/lib/content/sources";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { StatusBadge } from "@/components/editorial/status-badge";
import { MediaFrame } from "@/components/editorial/media-frame";
import { whatsappHref } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = LEGAL_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.legal}`,
    description: c.lead,
    imageAlt: getAsset("bm-04").alt[l],
  });
}

interface LegalLensPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LegalLens({ params }: LegalLensPageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = LEGAL_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter legal-hero" aria-labelledby="legal-title">
        <div className="shell">
          <div className="legal-hero__grid grid-uneven">
            <MediaFrame
              src={getAsset("bm-04").src}
              alt={getAsset("bm-04").alt[l]}
              width={getAsset("bm-04").width}
              height={getAsset("bm-04").height}
              sizes="(max-width: 768px) 100vw, 52vw"
              className="legal-hero__frame"
            />
            <div className="legal-hero__text reveal">
              <SectionHeading
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
              />
              <div className="legal-hero__meta">
                <StatusBadge status="concept" dict={dict} />
                <span>{c.statusLine}</span>
              </div>
              <p className="media-caption">{c.caption}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight disclaimer">
        <div className="shell">
          <div className="panel panel-gold reveal">
            <p className="eyebrow eyebrow-gold">{c.disclaimerTitle}</p>
            <p className="lead">{c.disclaimerBody}</p>
          </div>
        </div>
      </section>

      <section className="chapter sources">
        <div className="shell">
          <SectionHeading
            eyebrow={{ ar: "المصادر الرسمية", en: "Official sources" }}
            title={c.sourcesTitle}
            lead={c.sourcesIntro}
          />
          <div className="grid-uneven strips__grid">
            {OFFICIAL_SOURCES.map((source) => {
              const jurisdictionLabel =
                l === "ar"
                  ? {
                      "UAE-federal": "الإمارات — تشريعات اتحادية",
                      Sharjah: "الشارقة — مكتب الإعلام الحكومي",
                      Dubai: "دبي — الشؤون القانونية",
                    }[source.jurisdiction ?? ""] ?? source.jurisdiction
                  : source.jurisdiction;
              return (
                <div key={source.id} className="panel source-card reveal-delay">
                  <div className="source-card__header">
                    <p className="source-card__jurisdiction">{jurisdictionLabel}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-card__link"
                    >
                      {source.name[l]}
                    </a>
                    <span className="source-card__external">
                      {dict.common.externalLink}
                    </span>
                  </div>
                  <p className="source-card__body">{source.localContext[l]}</p>
                  <p className="media-caption source-card__note">
                    {dict.common.notAvailable}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="media-caption">{c.sourcesNote}</p>
        </div>
      </section>

      <section className="chapter chapter--tight planned">
        <div className="shell strips__grid">
          <SectionHeading
            eyebrow={{ ar: "المواد المخططة", en: "Planned materials" }}
            title={c.plannedTitle}
            lead={c.plannedBody}
          />
          <div className="grid-uneven strips__grid">
            {LEGAL_OUTLINES.map((outline) => (
              <div key={outline.id} className="panel outline-card reveal-delay">
                <div className="outline-card__top">
                  <span className="badge badge--concept outline-badge">{dict.status.outline}</span>
                  <span className="outline-card__jurisdiction">{outline.jurisdiction}</span>
                </div>
                <h4 className="outline-card__title">{outline.title[l]}</h4>
                <p className="outline-card__summary">{outline.summary[l]}</p>
                <p className="media-caption">{outline.note[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight contact">
        <div className="shell panel panel-gold reveal">
          <h2 className="display display-m">{dict.nav.contact}</h2>
          <p className="lead">{c.contactNote}</p>
          <a
            className="btn btn-gold"
            href={whatsappHref(l)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.common.explore} · WhatsApp
          </a>
          <p className="media-caption">{dict.common.externalLink} · {dict.common.opensInNewTab}</p>
        </div>
      </section>
    </>
  );
}

