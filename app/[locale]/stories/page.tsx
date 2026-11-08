import { Metadata } from "next";
import Link from "next/link";

import { STORIES_CONTENT } from "@/lib/content/pages/stories";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { MediaFrame } from "@/components/editorial/media-frame";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = STORIES_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.stories}`,
    description: c.statusLine,
    imageAlt: getAsset("bm-13").alt[l],
  });
}

interface StoriesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Stories({ params }: StoriesPageProps) {
  const { locale } = await params;
  const l: Locale = locale as Locale;
  const dict = getDictionary(l);
  const c = STORIES_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter stories-hero" aria-labelledby="stories-title">
        <div className="shell">
          <div className="stories-hero__grid grid-uneven">
            <MediaFrame
              src={getAsset("bm-13").src}
              alt={getAsset("bm-13").alt[l]}
              width={getAsset("bm-13").width}
              height={getAsset("bm-13").height}
              sizes="(max-width: 768px) 100vw, 56vw"
              className="stories-hero__frame"
            />
            <div className="stories-hero__text reveal">
              <SectionHeading
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
              />
              <div className="stories-hero__meta">
                <span className="badge badge--concept">{dict.status.conceptShort}</span>
                <span>{c.statusLine}</span>
              </div>
              <p className="media-caption">{c.caption[l]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight archive-note">
        <div className="shell panel reveal">
          <p className="eyebrow eyebrow-gold">{dict.nav.stories}</p>
          <p className="lead">{c.archiveNote}</p>
        </div>
      </section>

      <section className="chapter lanes">
        <div className="shell strips__grid">
          <SectionHeading
            eyebrow={{ ar: "مسارات الأرشيف", en: "Archive lanes" }}
            title={{ ar: "ما سيُروى هنا", en: "What will be told here" }}
            lead=""
          />
          <div className="grid-uneven strips__grid">
            {c.lanes.map((lane, i) => (
              <div key={i} className="panel lane-card reveal-delay">
                <h4 className="lane-card__title">{lane.title[l]}</h4>
                <p className="lane-card__body">{lane.body[l]}</p>
                <span className="badge badge--concept lane-card__status">{String(lane.status[l])}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight policy">
        <div className="shell strips__grid">
          <SectionHeading eyebrow={{ ar: "سياسة النشر", en: "Publication policy" }} title={{ ar: "", en: "" }} lead="" />
          <ul className="editorial-list">
            {c.policy.map((item, i) => (
              <li key={i} className="reveal-delay">
                <strong>{item.title[l]}</strong> — {item.body[l]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter chapter--tight">
        <div className="shell text-center reveal">
          <Link href={localizedPath(l, "/media")} className="btn btn-ghost">
            {dict.common.backToUniverse}
            <svg className="icon-arrow" viewBox="0 0 24 24" style={{ marginInlineStart: "0.5rem" }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

