import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/navigation/PageHero";
import { SecondaryWorlds } from "@/components/navigation/SecondaryWorlds";
import { MediaExplorer, type ExplorerItem } from "@/components/media/MediaExplorer";
import { StatusBadge } from "@/components/editorial/StatusBadge";
import { ArrowIcon } from "@/components/ui/icons";
import { getAsset } from "@/lib/content/assets";
import { portalWorlds, secondaryWorlds } from "@/lib/content/worlds";
import { mediaPageContent } from "@/lib/content/pages/media";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const copy = mediaPageContent[locale];
  return buildPageMetadata({
    locale,
    path: "/media",
    title: copy.hero.title,
    description: copy.hero.lead,
    image: "/brand/og-media.jpg",
    imageAlt: copy.hero.note,
  });
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const copy = mediaPageContent[locale];
  const heroAsset = getAsset("bm-09");

  const items: ExplorerItem[] = portalWorlds.map((world) => {
    const asset = getAsset(world.assetId);
    return {
      id: world.id,
      href: localizedPath(locale, world.href),
      title: world.title[locale],
      kicker: world.kicker[locale],
      teaser: world.teaser[locale],
      category: world.category,
      variant: world.variant,
      image: {
        src: asset.src,
        alt: asset.alt[locale],
        width: asset.width,
        height: asset.height,
        focalPoint: asset.focalPoint,
        blurDataURL: asset.blurDataURL,
      },
      searchText: [
        world.searchText.ar,
        world.searchText.en,
        world.title.ar,
        world.title.en,
        world.teaser.ar,
        world.teaser.en,
      ].join(" "),
    };
  });

  const worldCount = dict.explorer.resultsMany.replace(
    "{count}",
    String(portalWorlds.length),
  );

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        asset={heroAsset}
        caption={copy.hero.note}
        variant="wide"
        priority
        testId="media-hero"
        chips={
          <>
            <StatusBadge tone="concept">{dict.status.concept}</StatusBadge>
            <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
          </>
        }
      />

      <section className="section" aria-labelledby="catalog-title">
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">{copy.catalog.eyebrow}</p>
              <h2 id="catalog-title">{copy.catalog.title}</h2>
              <p className="lead">{copy.catalog.lead}</p>
            </div>
            <p className="section-head__aside">
              {worldCount} · {copy.statusNote}
            </p>
          </div>

          <MediaExplorer
            items={items}
            labels={{
              searchLabel: dict.explorer.searchLabel,
              searchPlaceholder: dict.explorer.searchPlaceholder,
              filterLabel: dict.explorer.filterLabel,
              categories: {
                all: dict.explorer.all,
                conversation: dict.explorer.conversation,
                legal: dict.explorer.legal,
                documentary: dict.explorer.documentary,
                audio: dict.explorer.audio,
              },
              resultsOne: dict.explorer.resultsOne,
              resultsMany: dict.explorer.resultsMany,
              noResultsTitle: dict.explorer.noResultsTitle,
              noResultsBody: dict.explorer.noResultsBody,
              resetAction: dict.explorer.resetAction,
              listLabel: dict.explorer.listLabel,
              statusLabel: dict.status.concept,
              ctaLabel: dict.common.enterWorld,
              illustrativeLabel: dict.common.illustrativeShort,
            }}
          />

          <div className="button-row" style={{ marginBlockStart: "1.6rem" }}>
            <Link className="text-link" href={localizedPath(locale)}>
              {dict.common.backToHome}
              <ArrowIcon className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--hairline" aria-labelledby="deeper-title">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">{copy.secondary.eyebrow}</p>
            <h2 id="deeper-title">{copy.secondary.title}</h2>
            <p className="lead">{copy.secondary.lead}</p>
          </div>
          <SecondaryWorlds locale={locale} worlds={secondaryWorlds} />
        </div>
      </section>
    </>
  );
}
