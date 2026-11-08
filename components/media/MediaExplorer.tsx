"use client";

import { useDeferredValue, useMemo, useState } from "react";
import clsx from "clsx";
import { SearchIcon } from "@/components/ui/icons";
import { WorldPortalCard } from "@/components/navigation/WorldPortalCard";
import {
  mediaCategories,
  normalizeSearch,
  type MediaCategoryFilter,
} from "@/lib/content/media-filter";
import type { MediaWorldEntry } from "@/lib/content/types";

export type ExplorerLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  categories: Record<MediaCategoryFilter, string>;
  resultsOne: string;
  resultsMany: string;
  noResultsTitle: string;
  noResultsBody: string;
  resetAction: string;
  listLabel: string;
  statusLabel: string;
  ctaLabel: string;
  illustrativeLabel: string;
};

type ExplorerImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: { x: number; y: number };
  blurDataURL: string;
};

export type ExplorerItem = {
  id: string;
  href: string;
  title: string;
  kicker: string;
  teaser: string;
  category: MediaWorldEntry["category"];
  variant: MediaWorldEntry["variant"];
  image: ExplorerImage;
  searchText: string;
};

export function MediaExplorer({
  items,
  labels,
}: {
  items: ExplorerItem[];
  labels: ExplorerLabels;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MediaCategoryFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const normalized = normalizeSearch(deferredQuery);
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalized) return true;
      return normalizeSearch(
        `${item.title} ${item.kicker} ${item.teaser} ${item.searchText}`,
      ).includes(normalized);
    });
  }, [items, deferredQuery, category]);

  const countLabel =
    results.length === 1
      ? labels.resultsOne
      : labels.resultsMany.replace("{count}", String(results.length));
  const filtersActive = query.trim().length > 0 || category !== "all";

  return (
    <div className="explorer">
      <div className="explorer__controls">
        <div className="explorer__search">
          <SearchIcon />
          <label htmlFor="media-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <input
            id="media-search"
            className="explorer__input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
          />
        </div>

        <div
          className="explorer__filters"
          role="group"
          aria-label={labels.filterLabel}
        >
          {mediaCategories.map((value) => (
            <button
              key={value}
              type="button"
              className="chip"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {labels.categories[value]}
            </button>
          ))}
        </div>
      </div>

      <div className="explorer__meta">
        <p className="explorer__count" aria-live="polite">
          {countLabel}
        </p>
        {filtersActive ? (
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            {labels.resetAction}
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="explorer__results" aria-label={labels.listLabel}>
          {results.map((item, index) => (
            <WorldPortalCard
              key={item.id}
              href={item.href}
              title={item.title}
              kicker={item.kicker}
              teaser={item.teaser}
              statusLabel={labels.statusLabel}
              statusTone="concept"
              illustrativeLabel={labels.illustrativeLabel}
              ctaLabel={labels.ctaLabel}
              index={String(index + 1).padStart(2, "0")}
              image={item.image}
              variant="wide"
              priority={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="no-results" role="status">
          <span className="badge badge--outline">
            {labels.categories[category]}
          </span>
          <h3>{labels.noResultsTitle}</h3>
          <p>{labels.noResultsBody}</p>
          <button
            type="button"
            className={clsx("btn", "btn--gold")}
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            {labels.resetAction}
          </button>
        </div>
      )}
    </div>
  );
}
