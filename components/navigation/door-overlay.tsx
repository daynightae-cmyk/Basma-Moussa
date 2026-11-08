"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import clsx from "clsx";
import { usePortalDoor } from "@/components/navigation/portal-transition-provider";
import { isPortalActive } from "@/lib/experience/portal-machine";

export function DoorOverlay() {
  const { machine, advance, closeDoor } = usePortalDoor();
  const { id, phase, request } = machine;
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const sourceTransform = request?.rect
    ? `translate(${request.rect.left}px, ${request.rect.top}px) scale(${request.rect.width / window.innerWidth}, ${request.rect.height / window.innerHeight})`
    : "scale(0.96)";

  useEffect(() => {
    if (!request || !isPortalActive(phase)) return;
    if (phase === "preparing") {
      const frame = requestAnimationFrame(() => advance({ type: "prepared", id }));
      return () => cancelAnimationFrame(frame);
    }
    if (phase === "waiting") return;

    const duration = phase === "expanding"
      ? (request.lowPower ? 220 : 420)
      : phase === "opening" ? (request.lowPower ? 450 : 780) : 280;
    const event = phase === "expanding" ? "expanded" : phase === "opening" ? "opened" : "finished";
    const animations: Animation[] = [];
    const options: KeyframeAnimationOptions = {
      duration,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    };
    const animate = (element: HTMLElement | null, frames: Keyframe[]) => {
      if (element?.animate) animations.push(element.animate(frames, options));
    };
    if (phase === "expanding") {
      animate(stageRef.current, [{ transform: sourceTransform }, { transform: "none" }]);
    } else if (phase === "opening") {
      animate(leftRef.current, [
        { transform: "none", opacity: 1 },
        { transform: request.lowPower ? "translateX(-55%)" : "translateX(-55%) rotateY(-18deg)", opacity: 0 },
      ]);
      animate(rightRef.current, [
        { transform: "none", opacity: 1 },
        { transform: request.lowPower ? "translateX(55%)" : "translateX(55%) rotateY(18deg)", opacity: 0 },
      ]);
    } else {
      animate(overlayRef.current, [{ opacity: 1 }, { opacity: 0 }]);
      animate(document.querySelector<HTMLElement>("#main h1, #main h2"), [
        { opacity: 0.65, transform: request.lowPower ? "none" : "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ]);
    }
    let cancelled = false;
    const finish = () => {
      if (!cancelled) advance({ type: event, id });
    };
    // Animation completion is primary; this bounded fallback also covers missing WAAPI.
    const fallback = window.setTimeout(finish, duration + 180);
    if (animations.length) Promise.all(animations.map((animation) => animation.finished)).then(finish).catch(() => {});
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      animations.forEach((animation) => animation.cancel());
    };
  }, [phase, id, request, advance, sourceTransform]);

  if (!request) return null;
  const ar = request.href.startsWith("/ar/");
  if (phase === "timed-out") {
    return (
      <aside className="portal-recovery" aria-label={ar ? "الانتقال إلى العالم" : "World navigation"}>
        <p role="status">{ar ? "أُزيل تأثير الانتقال لأن وصول الوجهة لم يتأكد بعد." : "The transition was released because arrival has not been confirmed yet."}</p>
        <a href={request.href}>{ar ? "فتح الوجهة مباشرة" : "Open destination directly"}</a>
        <button type="button" onClick={closeDoor}>{ar ? "إغلاق" : "Dismiss"}</button>
      </aside>
    );
  }
  if (!isPortalActive(phase)) return null;

  return (
    <div
      ref={overlayRef}
      className={clsx("door-overlay", `door-overlay--${phase}`, request.lowPower && "door-overlay--simple")}
      data-testid="portal-transition"
      data-phase={phase}
    >
      <div className="door-scrim" aria-hidden="true" />
      <div
        className="door-stage"
        ref={stageRef}
        style={{ "--portal-origin": sourceTransform } as CSSProperties}
        aria-hidden="true"
      >
        <div className="door-panel door-panel--a" ref={leftRef}>
          <Image src={request.src} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: request.objectPosition }} />
        </div>
        <div className="door-panel door-panel--b" ref={rightRef}>
          <Image src={request.src} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: request.objectPosition }} />
        </div>
        <div className="door-seam" />
        <div className="door-label"><span>{ar ? "عبور إلى" : "Entering"}</span><strong>{request.label}</strong></div>
      </div>
      <p className="door-status" role="status">
        {phase === "waiting" ? (ar ? "بانتظار محتوى الوجهة…" : "Waiting for destination content…") : ""}
      </p>
      <button className="door-skip" type="button" data-portal-skip onClick={closeDoor}>
        {ar ? "تخطّي الحركة" : "Skip transition"}<span aria-hidden="true"> ↗</span>
      </button>
    </div>
  );
}
