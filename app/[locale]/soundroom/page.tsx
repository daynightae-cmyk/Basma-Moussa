import { Metadata } from "next";

import { SOUNDROOM_CONTENT } from "@/lib/content/pages/soundroom";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { StatusBadge } from "@/components/editorial/status-badge";
import { MediaFrame } from "@/components/editorial/media-frame";
import { SoundroomConsole } from "@/components/media/soundroom-console";
import { SonicSculpture } from "@/components/media/sonic-sculpture";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = SOUNDROOM_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.soundroom}`,
    description: c.lead,
    imageAlt: getAsset("bm-01").alt[l],
  });
}

interface SoundroomPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Soundroom({ params }: SoundroomPageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = SOUNDROOM_CONTENT[l];
  const asset = getAsset("bm-01");

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter soundroom-hero" aria-labelledby="soundroom-title">
        <div className="shell">
          <div className="soundroom-hero__grid grid-uneven">
            <MediaFrame
              src={asset.src}
              alt={asset.alt[l]}
              width={asset.width}
              height={asset.height}
              sizes="(max-width: 768px) 100vw, 52vw"
              className="soundroom-hero__frame"
            />
            <div className="soundroom-hero__text reveal">
              <SectionHeading
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
              />
              <div className="soundroom-hero__meta">
                <StatusBadge status="concept" dict={dict} />
                <span>{c.statusLine}</span>
              </div>
              <p className="media-caption">{c.caption}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight player-state">
        <div className="shell">
          <div className="panel panel-gold reveal">
            <div className="player-state__inner">
              <div className="player-state__text">
                <h2 id="soundroom-title" className="display display-m">
                  {c.emptyTitle}
                </h2>
                <p>{c.emptyBody}</p>
              </div>
              <SoundroomConsole dict={dict} />
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight sonic-studio">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.soundroom.sculptureEyebrow}
            title={dict.soundroom.sculptureTitle}
            lead={dict.soundroom.sculptureLead}
          />
          <SonicSculpture
            locale={l}
            copy={{
              enable: dict.soundroom.sculptureEnable,
              stop: dict.soundroom.sculptureStop,
              requesting: dict.soundroom.micRequesting,
              denied: dict.soundroom.micDenied,
              unsupported: dict.soundroom.micUnsupported,
              error: dict.soundroom.micError,
              idle: dict.soundroom.sculptureIdle,
              live: dict.soundroom.sculptureLive,
              meterLabel: dict.soundroom.sculptureMeter,
              low: dict.soundroom.sculptureLow,
              mid: dict.soundroom.sculptureMid,
              high: dict.soundroom.sculptureHigh,
              privacy: dict.soundroom.sculpturePrivacy,
            }}
          />
        </div>
      </section>

      <section className="chapter formats">
        <div className="shell grid-uneven strips__grid">
          <div className="panel reveal">
            <SectionHeading
              eyebrow={{ ar: "الصيغ المخططة", en: "Planned formats" }}
              title={{ ar: "ماذا سيُستمع هنا؟", en: "What will be heard here?" }}
              lead={c.whatToExpectBody}
            />
            {c.formats.map((f, i) => (
              <div key={i} className="format-item reveal-delay">
                <p className="format__body">{f.title}</p>
              </div>
            ))}
          </div>
          <div className="panel reveal">
            <SectionHeading
              eyebrow={{ ar: "البوابة", en: "The gate" }}
              title={{ ar: "لا صوت حتى الآن", en: "No audio yet" }}
              lead={c.whatsReal[0]}
            />
            <ul className="editorial-list">
              {c.whatsReal.map((item, i) => (
                <li key={i} className="reveal-delay">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

