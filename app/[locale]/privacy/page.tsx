import { Metadata } from "next";

import { PRIVACY_CONTENT } from "@/lib/content/pages/privacy";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { whatsappHref } from "@/lib/site";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = PRIVACY_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.privacy}`,
    description: c.intro[l],
    noIndex: false,
  });
}

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Privacy({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = PRIVACY_CONTENT[l];

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter" id="privacy">
        <div className="shell">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} lead={c.intro[l]} />
          <div className="strips__grid prose">
            {c.sections.map((section, i) => (
              <div key={i} className="panel reveal-delay">
                <h3 className="display display-m">{section.title[l]}</h3>
                <p>{section.body[l]}</p>
              </div>
            ))}
          </div>
          <div className="panel reveal">
            <p className="eyebrow eyebrow-gold">{dict.nav.contact}</p>
            <p className="lead">{c.contactPractice[l]}</p>
            <a
              href={whatsappHref(l)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              {dict.common.explore} · WhatsApp
            </a>
            <p className="media-caption">{dict.common.externalLink} · {dict.common.opensInNewTab}</p>
          </div>
          <p className="media-caption">
            {c.changes[l]} — {c.updated[l]}
          </p>
          <Link href={localizedPath(l, "/")} className="btn btn-ghost">
            {dict.common.backToHome}
          </Link>
        </div>
      </section>
    </>
  );
}

