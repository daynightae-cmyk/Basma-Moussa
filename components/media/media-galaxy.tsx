"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import clsx from "clsx";

import { PORTAL_WORLDS } from "@/lib/content/worlds";
import { getAsset } from "@/lib/content/assets";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { StatusBadge } from "@/components/editorial/status-badge";

const COUNT = PORTAL_WORLDS.length;
const STEP = 360 / COUNT;

/**
 * The Living Media Galaxy.
 *
 * Every program is a lit gate standing on its own orbit spoke; the gates are
 * placed with real 3D transforms (`rotateY` + `translateZ`) so turning the
 * galaxy is a genuine camera move, not a crossfade. Dragging spins the ring,
 * arrow keys step it, and selecting a gate opens its world card.
 */
export function MediaGalaxy({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const dict = getDictionary(locale);
  const [index, setIndex] = useState(0);
  const [spin, setSpin] = useState(0);
  const drag = useRef<{ x: number; spin: number; id: number } | null>(null);

  const world = PORTAL_WORLDS[index];
  const asset = getAsset(world.assetId);

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
  };

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 6) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSpin(start.spin + dx * 0.55);
  };

  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 40) {
      setSpin(-index * STEP);
      return;
    }
    // Snap from the gesture itself: a fast drag can release before the last
    // pointermove has re-rendered, so state would still hold the old spin.
    const released = start.spin + dx * 0.55;
    const target = -Math.round(released / STEP);
    goTo(((target % COUNT) + COUNT) % COUNT);
  };

  return (
    <section className="galaxy" aria-labelledby="galaxy-title">
      <div className="shell shell--wide">
        <header className="galaxy__head">
          <p className="eyebrow eyebrow-gold">
            {ar ? "عالم الإعلام · المجرة" : "Media Universe · The Galaxy"}
          </p>
          <h2 id="galaxy-title" className="display display-m">
            {ar ? "مجرة الإعلام" : "The Media Galaxy"}
          </h2>
          <p className="lead">
            {ar
              ? "كل برنامج بوابة مضيئة في مدارها، والخيوط الذهبية تصل الحكايات ببعضها. دوّر المجرة، ثم اختر بوابة لتدخل عالمها."
              : "Every program is a lit gate in its own orbit, and golden threads tie the stories together. Turn the galaxy, then choose a gate to enter its world."}
          </p>
        </header>

        <div className="galaxy__stage">
          <div
          className="galaxy__scene"
          role="group"
          aria-roledescription={ar ? "مجرة تفاعلية" : "interactive galaxy"}
          data-testid="media-galaxy"
          onKeyDown={onKey}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          <span className="galaxy__sky" aria-hidden="true" />
          <div className="galaxy__ring" style={{ transform: `rotateY(${spin}deg)` }}>
            <span className="galaxy__orbit galaxy__orbit--outer" aria-hidden="true" />
            <span className="galaxy__orbit galaxy__orbit--inner" aria-hidden="true" />
            {PORTAL_WORLDS.map((item, position) => {
              const itemAsset = getAsset(item.assetId);
              const angle = position * STEP;
              const active = position === index;
              return (
                <div
                  key={item.id}
                  className="galaxy__slot"
                  style={{ transform: `rotateY(${angle}deg) translateZ(var(--galaxy-radius))` }}
                >
                  <span
                    className="galaxy__thread"
                    aria-hidden="true"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(calc(var(--galaxy-radius) / 2)) rotateX(90deg)`,
                    }}
                  />
                  <button
                    type="button"
                    className={clsx("galaxy__gate", active && "is-active")}
                    style={{ transform: `rotateY(${-spin - angle}deg)` }}
                    aria-pressed={active}
                    aria-label={item.title[locale]}
                    onClick={() => (active ? undefined : goTo(position))}
                  >
                    <span className="galaxy__gate-frame" aria-hidden="true">
                      <Image
                        src={itemAsset.src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 40vw, 220px"
                        draggable={false}
                        className="galaxy__gate-image"
                        style={{
                          objectFit: "cover",
                          objectPosition: `${itemAsset.focalPoint.x}% ${itemAsset.focalPoint.y}%`,
                        }}
                      />
                      <span className="galaxy__gate-veil" />
                    </span>
                    <span className="galaxy__gate-index" aria-hidden="true">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="galaxy__gate-kicker">{item.kicker[locale]}</span>
                    <span className="galaxy__gate-title">{item.title[locale]}</span>
                  </button>
                </div>
              );
            })}
            <span className="galaxy__core" aria-hidden="true">
              <span className="galaxy__core-halo" />
              <span className="galaxy__core-pin" />
            </span>
          </div>
          </div>

          <aside className="galaxy__card" aria-label={world.title[locale]}>
            <div className="galaxy__card-meta">
              <span className="galaxy__card-count">
                <span dir="ltr">
                  {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </span>
              </span>
              <StatusBadge status={world.status} dict={dict} />
            </div>
            <p className="galaxy__card-kicker">{world.kicker[locale]}</p>
            <h3 className="galaxy__card-title">{world.title[locale]}</h3>
            <p className="galaxy__card-teaser">{world.teaser[locale]}</p>
            <a className="galaxy__card-enter" href={localizedPath(locale, world.href)}>
              {dict.common.enterWorld}
              <span aria-hidden="true">{ar ? " ↖" : " ↗"}</span>
            </a>
          </aside>
        </div>

        <div className="galaxy__nav">
          <div className="galaxy__gates" role="group" aria-label={ar ? "بوابات المجرة" : "Galaxy gates"}>
            {PORTAL_WORLDS.map((item, position) => (
              <button
                key={item.id}
                type="button"
                className={clsx("galaxy__chip", position === index && "is-active")}
                aria-pressed={position === index}
                onClick={() => goTo(position)}
              >
                <span aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>
                {item.title[locale]}
              </button>
            ))}
          </div>
          <div className="galaxy__arrows">
            <button type="button" aria-label={ar ? "البوابة السابقة" : "Previous gate"} onClick={() => goTo(index - 1)}>
              {ar ? "→" : "←"}
            </button>
            <button type="button" aria-label={ar ? "البوابة التالية" : "Next gate"} onClick={() => goTo(index + 1)}>
              {ar ? "←" : "→"}
            </button>
          </div>
        </div>
        <p className="galaxy__hint">
          {ar
            ? "اسحب أفقيًا أو استخدم مفاتيح الأسهم لتشغيل مدار المجرة."
            : "Drag sideways or use the arrow keys to turn the galaxy."}
        </p>
        <p className="sr-only" aria-live="polite">
          {world.title[locale]} · {index + 1} / {COUNT}
        </p>
      </div>
    </section>
  );
}
