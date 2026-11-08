"use client";

import { useEffect, useRef } from "react";

import { usePortalDoor } from "@/components/navigation/portal-transition-provider";

export function DoorOverlay() {
  const { state, image, label, rect, closeDoor } = usePortalDoor();
  const stageRef = useRef<HTMLDivElement>(null);

  // Apply the card rect as CSS custom properties so the door expands from
  // shared geometry before the panels part.
  useEffect(() => {
    if (!stageRef.current || !rect || state !== "sealed") return;
    const s = stageRef.current.style;
    s.setProperty("--door-top", `${rect.top}px`);
    s.setProperty("--door-right", `${rect.right}px`);
    s.setProperty("--door-bottom", `${rect.bottom}px`);
    s.setProperty("--door-left", `${rect.left}px`);
  }, [state, rect]);

  if (state === "idle") return null;

  const isOpening = state === "opening" || state === "open";

  return (
    <div
      className={`door-overlay door-overlay--${state}`}
      aria-hidden="true"
      onClick={closeDoor}
    >
      <div className="door-stage" ref={stageRef}>
        <div
          className={`door-panel door-panel--a ${isOpening ? "door-panel--open" : "door-panel--closed"}`}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div
          className={`door-panel door-panel--b ${isOpening ? "door-panel--open" : "door-panel--closed"}`}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="door-seam" aria-hidden="true" />
        {!isOpening ? null : (
          <div className="door-label" aria-hidden="true">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
