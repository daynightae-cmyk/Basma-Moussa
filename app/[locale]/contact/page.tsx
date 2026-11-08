import { Metadata } from "next";

import { CONTACT_CONTENT } from "@/lib/content/pages/contact";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
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
  const c = CONTACT_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.contact}`,
    description: c.lead,
    imageAlt: getAsset("bm-10").alt[l],
  });
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Contact({ params }: ContactPageProps) {
  const { locale } = await params;
  const l: Locale = locale as Locale;
  const dict = getDictionary(l);
  const c = CONTACT_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter contact-hero" aria-labelledby="contact-title">
        <div className="shell">
          <div className="contact-hero__grid grid-uneven">
            <MediaFrame
              src={getAsset("bm-10").src}
              alt={getAsset("bm-10").alt[l]}
              width={getAsset("bm-10").width}
              height={getAsset("bm-10").height}
              sizes="(max-width: 768px) 100vw, 48vw"
              className="contact-hero__frame"
            />
            <div className="contact-hero__text reveal">
              <SectionHeading
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
              />
              <a
                href={whatsappHref(l)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                {c.whatsappLabel[l]}
                <svg className="icon-arrow" viewBox="0 0 24 24" style={{ marginInlineStart: "0.5rem" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <p className="media-caption contact-hero__whatsapp-sub">{c.whatsappSub[l]}</p>
              <p className="media-caption">{dict.common.externalLink} · {dict.common.opensInNewTab}</p>
              <p className="media-caption">{c.caption[l]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight no-form">
        <div className="shell panel reveal">
          <p className="eyebrow eyebrow-gold">{c.noFormTitle}</p>
          <p className="lead">{c.noFormBody[l]}</p>
        </div>
      </section>

      <section className="chapter themes">
        <div className="shell strips__grid">
          <SectionHeading
            eyebrow={{ ar: "أوجه التعاون", en: "Collaboration themes" }}
            title={{ ar: "", en: "" }}
            lead=""
          />
          <div className="grid-uneven strips__grid">
            {c.themes.map((theme, i) => (
              <div key={i} className="panel theme-card reveal-delay">
                <h4 className="theme-card__title">{theme.title[l]}</h4>
                <p className="theme-card__body">{theme.body[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight privacy-note">
        <div className="shell panel reveal">
          <p className="eyebrow eyebrow-gold">{dict.nav.privacy}</p>
          <p className="lead">{c.privacyNote[l]}</p>
        </div>
      </section>
    </>
  );
}

