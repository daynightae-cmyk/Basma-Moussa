"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import clsx from "clsx";

import { LEGAL_OUTLINES } from "@/lib/content/legal";
import { JURISDICTION_LABELS, getOfficialSource } from "@/lib/content/sources";
import type { Locale } from "@/lib/i18n/config";

const FACETS = LEGAL_OUTLINES.slice(0, 3);
const COUNT = FACETS.length;
const STEP = 360 / COUNT;

interface JusticePrismProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  hint: string;
  facetLabel: string;
  sourceLabel: string;
  statusLabel: string;
  externalLinkLabel: string;
  opensInNewTabLabel: string;
}

/**
 * The Justice Prism — a hall of perspectives.
 *
 * Three editorial outlines stand as glass facets on a real CSS-3D prism: the
 * body turns with a drag or the arrow keys, and the facet facing the visitor
 * unfolds into a reading card. The copy stays what it is everywhere else in
 * this world: unreleased outlines, never legal advice.
 */
export function JusticePrism({
  locale,
  eyebrow,
  title,
  lead,
  hint,
  facetLabel,
  sourceLabel,
  statusLabel,
  externalLinkLabel,
  opensInNewTabLabel,
}: JusticePrismProps) {
  const ar = locale === "ar";
  const [index, setIndex] = useState(0);
  const [spin, setSpin] = useState(0);
  const drag = useRef<{ x: number; spin: number; id: number } | null>(null);

  const outline = FACETS[index];
  const source = getOfficialSource(outline.sourceIds[0]);
  const jurisdiction = JURISDICTION_LABELS[outline.jurisdiction]?.[locale] ?? outline.jurisdiction;

  const goTo = (next: number) => {
    const wrapped = ((next % COUNT) + COUNT) % COUNT;
    setIndex(wrapped);
    setSpin(-wrapped * STEP);
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = (event.key === "ArrowRight" ? 1 : -1) * (ar ? -1 : 1);
      goTo(index + step);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      goTo(event.key === "Home" ? 0 : COUNT - 1);
    }
  };

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { x: event.clientX, spin, id: event.pointerId };
    // Capture on the gesture's own pointerdown: capturing mid-move can throw
    // when the pointer is already gone.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer already released — nothing to capture */
    }
  };

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 6) return;
    setSpin(start.spin + dx * 0.4);
  };

  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 40) {
      setSpin(-index * STEP);
      return;
    }
    const released = start.spin + dx * 0.4;
    const target = -Math.round(released / STEP);
    goTo(((target % COUNT) + COUNT) % COUNT);
  };

  return (
    <section className="prism" aria-labelledby="prism-title">
      <header className="prism__head">
        <p className="eyebrow eyebrow-gold">{eyebrow}</p>
        <h2 id="prism-title" className="display display-m">
          {title}
        </h2>
        <p className="lead">{lead}</p>
      </header>

      <div className="prism__stage">
        <div
          className="prism__scene"
          role="group"
          aria-roledescription={ar ? "منشور تفاعلي" : "interactive prism"}
          aria-label={title}
          tabIndex={0}
          data-testid="justice-prism"
          onKeyDown={onKey}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          <span className="prism__halo" aria-hidden="true" />
          <span className="prism__spectrum" aria-hidden="true" />
          <div className="prism__body" style={{ transform: `rotateX(-7deg) rotateY(${spin}deg)` }}>
            {FACETS.map((facet, position) => (
              <button
                key={facet.id}
                type="button"
                className={clsx("prism__facet", position === index && "is-active")}
                style={{ transform: `rotateY(${position * STEP}deg) translateZ(var(--prism-r))` }}
                aria-pressed={position === index}
                aria-label={`${facetLabel} ${position + 1}: ${facet.title[locale]}`}
                onClick={() => (position === index ? undefined : goTo(position))}
              >
                <span className="prism__facet-glass" aria-hidden="true" />
                <span className="prism__facet-label">
                  <span className="prism__facet-index" dir="ltr">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="prism__facet-title">{facet.title[locale]}</span>
                </span>
              </button>
            ))}
            <span className="prism__core" aria-hidden="true">
              <span className="prism__core-light" />
            </span>
          </div>
          <span className="prism__floor" aria-hidden="true" />
        </div>

        <aside className="prism__card" aria-label={outline.title[locale]}>
          <div className="prism__card-meta">
            <span className="prism__card-count">
              <span dir="ltr">
                {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </span>
            </span>
            <span className="badge badge--concept outline-badge">{statusLabel}</span>
          </div>
          <p className="prism__card-kicker">{jurisdiction}</p>
          <h3 className="prism__card-title">{outline.title[locale]}</h3>
          <p className="prism__card-summary">{outline.summary[locale]}</p>
          <p className="prism__card-note">{outline.note[locale]}</p>
          <a
            className="prism__card-source"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="prism__card-source-label">
              {sourceLabel}: {source.name[locale]}
            </span>
            <span className="media-caption">
              {externalLinkLabel} · {opensInNewTabLabel}
            </span>
          </a>
        </aside>
      </div>

      <div className="prism__nav">
        <div className="prism__chips" role="group" aria-label={facetLabel}>
          {FACETS.map((facet, position) => (
            <button
              key={facet.id}
              type="button"
              className={clsx("prism__chip", position === index && "is-active")}
              aria-pressed={position === index}
              onClick={() => goTo(position)}
            >
              <span aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>
              {facet.title[locale]}
            </button>
          ))}
        </div>
        <div className="prism__arrows">
          <button type="button" aria-label={ar ? "الوجه السابق" : "Previous facet"} onClick={() => goTo(index - 1)}>
            {ar ? "→" : "←"}
          </button>
          <button type="button" aria-label={ar ? "الوجه التالي" : "Next facet"} onClick={() => goTo(index + 1)}>
            {ar ? "←" : "→"}
          </button>
        </div>
      </div>
      <p className="prism__hint">{hint}</p>
      <p className="sr-only" aria-live="polite">
        {outline.title[locale]} · {index + 1} / {COUNT}
      </p>
    </section>
  );
}
