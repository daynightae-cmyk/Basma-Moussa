import { Metadata } from "next";
import Link from "next/link";

import { ABOUT_CONTENT } from "@/lib/content/pages/about";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { MediaFrame } from "@/components/editorial/media-frame";
import { SectionHeading } from "@/components/editorial/section-heading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = ABOUT_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.about}`,
    description: c.lead,
    imageAlt: getAsset("bm-02").alt[l],
  });
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = ABOUT_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter" id="about-hero">
        <div className="shell grid-uneven about-hero">
          <MediaFrame
            src={getAsset("bm-02").src}
            alt={getAsset("bm-02").alt[l]}
            width={getAsset("bm-02").width}
            height={getAsset("bm-02").height}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="about-hero__frame"
            focalClass="focal-left"
          />
          <div className="about-hero__body reveal">
            <SectionHeading
              eyebrow={c.eyebrow}
              title={c.title}
              lead={c.lead}
            />
            <Link href={localizedPath(l, "/media")} className="btn btn-ghost">
              {dict.common.explore} · {dict.nav.media}
              <svg className="icon-arrow" viewBox="0 0 24 24" style={{ marginInlineStart: "0.5rem" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight" id="accuracy">
        <div className="shell">
          <div className="panel reveal">
            <p className="eyebrow eyebrow-gold">{c.accuracyTitle}</p>
            <p className="lead">{c.accuracyBody}</p>
          </div>
        </div>
      </section>

      <section className="chapter" id="focus">
        <div className="shell grid-uneven strips__grid">
          <div className="panel reveal">
            <p className="eyebrow eyebrow-gold">{c.verifiedTitle}</p>
            <p className="lead">{c.verifiedBody}</p>
          </div>
          {c.focus.map((item, i) => (
            <div key={i} className="panel reveal-delay">
              <p className="eyebrow eyebrow-gold">{item.title[l]}</p>
              <p className="lead">{item.body[l]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter chapter--tight honesty">
        <div className="shell">
          <div className="panel reveal">
            <p className="eyebrow eyebrow-gold">{c.honestyNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}

