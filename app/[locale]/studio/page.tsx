import { Metadata } from "next";
import Link from "next/link";

import { STUDIO_CONTENT } from "@/lib/content/pages/studio";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { MediaFrame } from "@/components/editorial/media-frame";
import { StudioExperience } from "@/components/studio/studio-experience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = STUDIO_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.studio}`,
    description: c.lead,
    imageAlt: getAsset("bm-09").alt[l],
  });
}

interface StudioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Studio({ params }: StudioPageProps) {
  const { locale } = await params;
  const l: Locale = locale as Locale;
  const dict = getDictionary(l);
  const c = STUDIO_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter studio-hero" aria-labelledby="studio-title">
        <div className="shell">
          <div className="studio-hero__grid grid-uneven">
            <div className="studio-hero__text reveal">
              <SectionHeading
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
              />
              <p className="media-caption">{c.caption[l]}</p>
            </div>
            <MediaFrame
              src={getAsset("bm-09").src}
              alt={getAsset("bm-09").alt[l]}
              width={getAsset("bm-09").width}
              height={getAsset("bm-09").height}
              sizes="(max-width: 768px) 100vw, 48vw"
              className="studio-hero__frame"
            />
          </div>
        </div>
      </section>

      <StudioExperience dict={dict} locale={l} />

      <section className="chapter process">
        <div className="shell strips__grid">
          <SectionHeading eyebrow={{ ar: "العملية", en: "The process" }} title={{ ar: "", en: "" }} lead="" />
          <div className="grid-uneven strips__grid">
            {c.steps.map((step, i) => (
              <div key={i} className="panel process-step reveal-delay">
                <span className="process__label">{step.label[l]}</span>
                <h4 className="process__title">{step.title[l]}</h4>
                <p className="process__body">{step.body[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight library">
        <div className="shell panel reveal">
          <p className="eyebrow eyebrow-gold">{c.libraryTitle}</p>
          <p className="lead">{c.libraryBody[l]}</p>
          <Link href={localizedPath(l, "/media")} className="btn btn-ghost">
            {dict.common.explore} · {dict.nav.media}
            <svg className="icon-arrow" viewBox="0 0 24 24" style={{ marginInlineStart: "0.5rem" }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

