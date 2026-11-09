"use client";

import { useMemo, useState } from "react";

import { MEDIA_CONTENT } from "@/lib/content/pages/media";
import { PORTAL_WORLDS } from "@/lib/content/worlds";
import { getAsset } from "@/lib/content/assets";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BrandThreadSplash } from "@/components/brand/splash";
import { StatusBadge } from "@/components/editorial/status-badge";
import { PortalLink } from "@/components/navigation/portal-link";
import Image from "next/image";
import { SectionHeading } from "@/components/editorial/section-heading";
import { WorldDiscoveryStage } from "@/components/media/world-discovery-stage";
import { MediaGalaxy } from "@/components/media/media-galaxy";

interface MediaContentProps {
  locale: Locale;
}

export function MediaContent({ locale }: MediaContentProps) {
  const dict = getDictionary(locale);
  const c = MEDIA_CONTENT[locale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return PORTAL_WORLDS.filter((world) => {
      const matchQuery =
        !q ||
        world.title.ar.toLowerCase().includes(q) ||
        world.title.en.toLowerCase().includes(q) ||
        world.teaser.ar.toLowerCase().includes(q) ||
        world.teaser.en.toLowerCase().includes(q) ||
        world.kicker.ar.toLowerCase().includes(q) ||
        world.kicker.en.toLowerCase().includes(q);
      const matchFilter = filter === "all" || world.category === filter;
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  return (
    <>
      <BrandThreadSplash locale={locale} dict={dict} />
      <WorldDiscoveryStage locale={locale} />
      <MediaGalaxy locale={locale} />
      <section className="chapter" id="media-hero">
        <div className="shell">
          <SectionHeading
            eyebrow={c.eyebrow}
            title={c.title}
            lead={c.lead}
          />
          <p className="media-caption status-line">{c.statusLine}</p>
          <div className="media__controls reveal">
            <label className="control__label" htmlFor="bm-search">
              {dict.common.search}
            </label>
            <input
              id="bm-search"
              type="search"
              className="control__input"
              placeholder={dict.explorer.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={dict.explorer.searchLabel}
            />
            <div className="control__filters">
              <span className="control__label">{dict.explorer.filterLabel}</span>
              <button
                className={`control__chip ${filter === "all" ? "control__chip--active" : ""}`}
                onClick={() => setFilter("all")}
              >
                {dict.explorer.all}
              </button>
              {[
                { id: "conversation", label: dict.explorer.conversation },
                { id: "legal", label: dict.explorer.legal },
                { id: "documentary", label: dict.explorer.documentary },
                { id: "audio", label: dict.explorer.audio },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`control__chip ${filter === item.id ? "control__chip--active" : ""}`}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="control__chip control__chip--reset"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              >
                {dict.explorer.resetAction}
              </button>
            </div>
            <p className="control__count">
              {results.length === 1
                ? dict.explorer.resultsOne
                : dict.explorer.resultsMany.replace("{count}", String(results.length))}
            </p>
          </div>
          {results.length === 0 && (
            <div className="panel empty-state reveal">
              <p className="eyebrow eyebrow-gold">{dict.explorer.noResultsTitle}</p>
              <p>{dict.explorer.noResultsBody}</p>
            </div>
          )}
          <div className="grid-uneven grid-uneven--worlds">
            {results.map((world) => {
              const asset = getAsset(world.assetId);
              return (
                <PortalLink
                  key={world.id}
                  href={localizedPath(locale, world.href)}
                  doorImage={asset.src}
                  doorLabel={world.title[locale]}
                  className={`portal-card world-card ${world.variant === "wide" ? "world--large" : ""}`}
                  media={
                    <Image
                      src={asset.src}
                      alt={asset.alt[locale]}
                      width={asset.width}
                      height={asset.height}
                      sizes="(max-width: 768px) 100vw, 48vw"
                      loading="lazy"
                      className="portal-card__img"
                    />
                  }
                  body={
                    <>
                      <div className="portal-card__meta">
                        <StatusBadge status={world.status} dict={dict} />
                        <span className="portal-card__provenance">
                          {dict.common.illustrativeShort}
                        </span>
                      </div>
                      <p className="portal-card__kicker">{world.kicker[locale]}</p>
                      <h3 className="portal-card__title">{world.title[locale]}</h3>
                      <p className="portal-card__teaser">{world.teaser[locale]}</p>
                      <span className="portal-card__cta">
                        {dict.common.enterWorld}
                        <svg className="icon-arrow" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="chapter chapter--tight">
        <div className="shell strips__grid">
          <h2 className="display display-m">{c.deeperTitle}</h2>
          <p className="lead">{c.deeperLead}</p>
        </div>
      </section>
    </>
  );
}
