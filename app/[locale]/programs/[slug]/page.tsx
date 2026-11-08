import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { PROGRAMS } from "@/lib/content/programs";
import { getAsset } from "@/lib/content/assets";
import { buildPageMeta } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { SectionHeading } from "@/components/editorial/section-heading";
import { StatusBadge } from "@/components/editorial/status-badge";
import { whatsappHref } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const l = locale as Locale;
  const program = PROGRAMS.find((item) => item.slug === slug);
  if (!program) return { title: "Not found" };
  const dict = getDictionary(l);
  return buildPageMeta({
    locale: l,
    path: `/programs/${slug}`,
    title: `${program.title[l]} · ${dict.nav.media}`,
    description: program.description[l],
    imageAlt: getAsset(program.heroAssetId).alt[l],
  });
}

export async function generateStaticParams() {
  const locales: Locale[] = ["ar", "en"];
  return PROGRAMS.flatMap((program) =>
    locales.map((locale) => ({ slug: program.slug, locale }))
  );
}

interface ProgramPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug, locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const program = PROGRAMS.find((item) => item.slug === slug);
  if (!program) notFound();
  const asset = getAsset(program.heroAssetId);
  const secondary = program.secondaryAssetId ? getAsset(program.secondaryAssetId) : null;

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <section className="chapter program-hero" aria-labelledby="program-title">
        <div className="shell">
          <div className="program-hero__grid grid-uneven">
            <div className="program-hero__text reveal">
              <SectionHeading
                eyebrow={program.worldName}
                title={program.title}
                lead={program.description}
              />
              <div className="program-hero__meta">
                <StatusBadge status={program.status} dict={dict} />
                <span>{program.statusNote[l]}</span>
              </div>
              <p className="media-caption">{asset.alt[l]}</p>
              {secondary && <p className="media-caption">{secondary.alt[l]}</p>}
            </div>
            <div className="program-hero__media media-frame">
              <Image
                src={asset.src}
                alt={asset.alt[l]}
                width={asset.width}
                height={asset.height}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="program-hero__img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight formats">
        <div className="shell grid-uneven strips__grid">
          <div className="panel reveal">
            <SectionHeading
              eyebrow={{ ar: "صيغ العالم", en: "World formats" }}
              title={program.tagline}
              lead={program.atmosphere}
            />
            {program.formats.map((f, i) => (
              <div key={i} className="format-item reveal-delay">
                <p className="format__body">{f[l]}</p>
              </div>
            ))}
          </div>
          <div className="panel reveal">
            <p className="eyebrow eyebrow-gold">{dict.common.status}</p>
            <h3 className="display display-m">{program.statusNote[l]}</h3>
            {program.quote && (
              <blockquote className="program-quote">
                “{program.quote[l]}”
              </blockquote>
            )}
            <p className="media-caption">{dict.common.illustrativeShort}</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight gates">
        <div className="shell">
          <p className="eyebrow eyebrow-gold">ما سيُصبح العالم</p>
          <ul className="editorial-list">
            {program.approach.map((a, i) => (
              <li key={i} className="reveal-delay">
                <strong>{a[l]}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter chapter--tight cta">
        <div className="shell panel panel-gold reveal">
          <h2 className="display display-m">الخطوة التالية</h2>
          <p className="lead">
            العالم قيد التطوير. عندما تكون المواد حقيقية ومعتمدة، سيفتح الباب.
          </p>
          <div className="cta__actions">
            <Link href={localizedPath(l, "/media")} className="btn btn-gold">
              {dict.common.backToUniverse}
            </Link>
            <a
              href={whatsappHref(l)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {dict.common.explore} · WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

