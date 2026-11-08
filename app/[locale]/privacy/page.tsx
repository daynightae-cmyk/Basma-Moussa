import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { privacyPageContent } from "@/lib/content/pages/privacy";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = privacyPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: copy.hero.title,
    description: copy.hero.lead,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = privacyPageContent[locale];

  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="shell shell--narrow">
          <div className="page-hero__copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="lead">{copy.hero.lead}</p>
            <p className="meta">{copy.hero.updated}</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell shell--narrow">
          {copy.sections.map((section) => (
            <section className="privacy-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <div className="callout" style={{ marginBlockStart: "2rem" }}>
            <strong>{copy.closing.title}</strong>
            {copy.closing.body}
          </div>

          <div className="button-row" style={{ marginBlockStart: "1.6rem" }}>
            <Link
              className="btn btn--gold"
              href={localizedPath(locale, "/contact")}
            >
              {copy.cta.action}
            </Link>
            <Link className="btn btn--ghost" href={localizedPath(locale)}>
              {dict.common.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
