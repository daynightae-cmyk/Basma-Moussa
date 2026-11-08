"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PORTAL_WORLDS } from "@/lib/content/worlds";
import { getAsset } from "@/lib/content/assets";
import { PortalLink } from "@/components/navigation/portal-link";
import { StatusBadge } from "@/components/editorial/status-badge";

export function WorldDiscoveryStage({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);
  const ar = locale === "ar";
  const dict = getDictionary(locale);
  const world = PORTAL_WORLDS[index];
  const asset = getAsset(world.assetId);
  const select = (step: number) => setIndex((current) => (current + step + PORTAL_WORLDS.length) % PORTAL_WORLDS.length);

  const onKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      select((event.key === "ArrowRight" ? 1 : -1) * (ar ? -1 : 1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setIndex(event.key === "Home" ? 0 : PORTAL_WORLDS.length - 1);
    }
  };
  const pointerStart = (event: PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 16 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };
  const pointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(event.clientY - start.y) * 1.2) return;
    suppressClick.current = true;
    select((dx < 0 ? 1 : -1) * (ar ? -1 : 1));
  };

  return (
    <section className="discovery" aria-labelledby="discovery-title" onKeyDown={onKey} aria-roledescription={ar ? "عارض عوالم" : "carousel"}>
      <div className="shell">
        <header className="discovery__header">
          <div>
            <p className="eyebrow eyebrow-gold">{ar ? "بسمة موسى · عالم الإعلام" : "Basma Moussa · Media Universe"}</p>
            <h1 id="discovery-title">{ar ? "أربعة أبواب. آفاق مختلفة." : "Four doors. Different horizons."}</h1>
          </div>
          <p>{ar ? "اختر عالمًا، واكتشف الرؤية خلفه. كل برنامج هنا مفهوم قيد التطوير، لا حلقة منشورة." : "Choose a world and discover the vision behind it. These are program concepts in development, not published episodes."}</p>
        </header>
        <div
          className="discovery__screen"
          data-world={world.category}
          data-testid="world-discovery"
          onPointerDown={pointerStart}
          onPointerMove={pointerMove}
          onPointerUp={pointerEnd}
          onPointerCancel={() => { gesture.current = null; }}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          <span className="discovery__frame discovery__frame--one" aria-hidden="true" />
          <span className="discovery__frame discovery__frame--two" aria-hidden="true" />
          <PortalLink
            href={localizedPath(locale, world.href)}
            doorImage={asset.src}
            doorLabel={world.title[locale]}
            mediaTestId="discovery-media"
            className="discovery__portal"
            media={
              <Image
                key={world.id}
                src={asset.src}
                alt={asset.alt[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectFit: "cover", objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%` }}
                draggable={false}
              />
            }
            body={
              <>
                <p className="discovery__chapter"><span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(PORTAL_WORLDS.length).padStart(2, "0")}</span> · {world.kicker[locale]}</p>
                <StatusBadge status={world.status} dict={dict} />
                <h2>{world.title[locale]}</h2>
                <p className="discovery__teaser">{world.teaser[locale]}</p>
                <span className="discovery__enter">{dict.common.enterWorld}<span aria-hidden="true">{ar ? " ↖" : " ↗"}</span></span>
                <small>{dict.common.illustrativeShort}</small>
              </>
            }
          />
        </div>
        <div className="discovery__navigation">
          <div className="discovery__choices" role="group" aria-label={ar ? "اختيار العالم" : "Choose a world"}>
            {PORTAL_WORLDS.map((item, position) => (
              <button type="button" key={item.id} aria-pressed={index === position} className={clsx("discovery__choice", index === position && "discovery__choice--active")} onClick={() => setIndex(position)}>
                <span aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>{item.title[locale]}
              </button>
            ))}
          </div>
          <div className="discovery__arrows">
            <button type="button" aria-label={ar ? "العالم السابق" : "Previous world"} onClick={() => select(-1)}>{ar ? "→" : "←"}</button>
            <button type="button" aria-label={ar ? "العالم التالي" : "Next world"} onClick={() => select(1)}>{ar ? "←" : "→"}</button>
          </div>
        </div>
        <p className="discovery__hint">{ar ? "اسحب أفقيًا أو استخدم مفاتيح الأسهم. لن تتغير المشاهد تلقائيًا." : "Swipe sideways or use arrow keys. Scenes never advance automatically."}</p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{world.title[locale]} · {index + 1} / {PORTAL_WORLDS.length}</p>
      </div>
    </section>
  );
}
