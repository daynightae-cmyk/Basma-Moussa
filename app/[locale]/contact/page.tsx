import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { ExternalIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import { contactPageContent } from "@/lib/content/pages/contact";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildPageMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = contactPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-contact.jpg",
    imageAlt: copy.hero.caption,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = contactPageContent[locale];
  const hero = getAsset("bm-08");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        asset={hero}
        caption={copy.hero.caption}
        variant="portrait"
        priority
        testId="contact-hero"
        chips={
          <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
        }
        actions={
          <>
            <a
              className="btn btn--gold"
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.whatsapp.cta}
              <ExternalIcon className="arrow" />
              <span className="sr-only">({dict.common.opensInNewTab})</span>
            </a>
            <Link className="btn btn--ghost" href={localizedPath(locale, "/privacy")}>
              {copy.privacy.cta}
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="whatsapp-title">
        <div className="shell">
          <div className="panel panel--gold">
            <div className="contact-panel">
              <div className="contact-panel__copy">
                <p className="eyebrow">{copy.whatsapp.eyebrow}</p>
                <h2 id="whatsapp-title">{copy.whatsapp.title}</h2>
                <p className="lead">{copy.whatsapp.body}</p>
                <div className="button-row">
                  <a
                    className="btn btn--gold"
                    href={whatsappHref(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.whatsapp.cta}
                    <ExternalIcon className="arrow" />
                    <span className="sr-only">
                      ({dict.common.opensInNewTab})
                    </span>
                  </a>
                  <Link
                    className="text-link"
                    href={localizedPath(locale, "/privacy")}
                  >
                    {copy.privacy.cta}
                  </Link>
                </div>
                <p className="contact-panel__note">{copy.whatsapp.note}</p>
              </div>

              <div className="contact-panel__figure">
                <div className="panel panel--flat" style={{ boxShadow: "none" }}>
                  <p className="panel__eyebrow">{copy.closing.title}</p>
                  <p>{copy.closing.body}</p>
                  <div className="status-grid" style={{ marginBlockStart: "1rem" }}>
                    <div className="metric">
                      <span className="metric__value" aria-hidden="true">
                        01
                      </span>
                      <span className="metric__label">
                        {locale === "ar" ? "قناة عامة موثّقة" : "verified public channel"}
                      </span>
                    </div>
                    <div className="metric">
                      <span className="metric__value" aria-hidden="true">
                        00
                      </span>
                      <span className="metric__label">
                        {locale === "ar" ? "نماذج إرسال غير موثّقة" : "unverified forms"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="themes-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.themes.eyebrow}</p>
            <h2 id="themes-title">{copy.themes.title}</h2>
            <p className="lead">{copy.themes.lead}</p>
          </div>
          <div className="four-grid">
            {copy.themes.items.map((item, index) => (
              <article className="pillar" key={item.title}>
                <span className="pillar__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="noform-title">
        <div className="shell">
          <div className="two-grid">
            <div className="panel">
              <p className="panel__eyebrow">{copy.noForm.eyebrow}</p>
              <h2 id="noform-title" className="compact">
                {copy.noForm.title}
              </h2>
              <p>{copy.noForm.body}</p>
            </div>
            <div className="panel panel--flat">
              <p className="panel__eyebrow">{copy.privacy.title}</p>
              <p>{copy.privacy.body}</p>
              <Link
                className="text-link"
                href={localizedPath(locale, "/privacy")}
                style={{ marginBlockStart: "0.8rem" }}
              >
                {copy.privacy.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
