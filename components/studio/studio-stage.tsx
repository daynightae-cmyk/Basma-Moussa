"use client";

import { useCallback } from "react";

import type { Dictionary } from "@/lib/i18n/dictionary";
import { BRAND } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import {
  cameraPreset,
  cameraTransform,
  lightingVars,
  type CameraId,
  type FurnitureItem,
  type LightingState,
} from "@/lib/experience/studio-scene";
import { FurnitureShape, StudioPlant } from "@/components/studio/furniture";

export interface StudioStageProps {
  dict: Dictionary;
  locale: Locale;
  items: FurnitureItem[];
  selectedId: string | null;
  camera: CameraId;
  lighting: LightingState;
  prompter: string;
  elapsed: string;
  sceneLabel: string;
  /** True only while the broadcast machine reports a real live session. */
  onAir: boolean;
  onAirAction: () => void;
  onSelect: (id: string | null) => void;
  onNudge: (id: string, dx: number, dz: number) => void;
  onRotate: (id: string, delta: number) => void;
}

const NUDGE_STEP = 8;
const ROTATE_STEP = 15;

export function StudioStage({
  dict,
  locale,
  items,
  selectedId,
  camera,
  lighting,
  prompter,
  elapsed,
  sceneLabel,
  onAir,
  onAirAction,
  onSelect,
  onNudge,
  onRotate,
}: StudioStageProps) {
  const activeCamera = cameraPreset(camera);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, id: string) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          onNudge(id, -NUDGE_STEP, 0);
          break;
        case "ArrowRight":
          event.preventDefault();
          onNudge(id, NUDGE_STEP, 0);
          break;
        case "ArrowUp":
          event.preventDefault();
          onNudge(id, 0, -NUDGE_STEP);
          break;
        case "ArrowDown":
          event.preventDefault();
          onNudge(id, 0, NUDGE_STEP);
          break;
        case "[":
          event.preventDefault();
          onRotate(id, -ROTATE_STEP);
          break;
        case "]":
          event.preventDefault();
          onRotate(id, ROTATE_STEP);
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          onSelect(id);
          break;
        case "Escape":
          onSelect(null);
          break;
        default:
          break;
      }
    },
    [onNudge, onRotate, onSelect],
  );

  return (
    <div
      className="studio-stage"
      data-camera={camera}
      data-selected={selectedId ?? "none"}
      aria-label={dict.studio.experienceTitle}
    >
      <div className="studio-stage__viewport">
        <div
          className="studio-world"
          style={{ transform: cameraTransform(camera) }}
        >
          <div className="studio-wall" aria-hidden="true">
            <span className="studio-wall__glow" />
            <span className="studio-wall__slats" />
            <span className="studio-wall__brand">
              <span className="wordmark-ar">{BRAND.name}</span>
            </span>
          </div>

          <div className="studio-onair" data-live={onAir} aria-hidden="true">
            <span className="studio-onair__plate">
              <span className="studio-onair__lamp" />
              <span className="studio-onair__text">ON AIR</span>
            </span>
          </div>

          <div className="studio-truss" aria-hidden="true">
            <span className="studio-truss__bar" />
            <span className="studio-fixture studio-fixture--a" />
            <span className="studio-fixture studio-fixture--b" />
            <span className="studio-fixture studio-fixture--c" />
          </div>

          <div className="studio-floor" aria-hidden="true">
            <span className="studio-floor__grid" />
            <span className="studio-floor__sheen" />
          </div>

          <div
            className="studio-prompter"
            aria-hidden="true"
            title={dict.studio.teleprompter}
          >
            <span className="studio-prompter__glass">
              {prompter.trim() ? prompter.slice(0, 180) : dict.studio.teleprompterPlaceholder}
            </span>
          </div>

          <div className="studio-clock" aria-hidden="true">
            <span className="studio-clock__label">ON SET</span>
            <span className="studio-clock__time">{elapsed}</span>
          </div>

          <StudioPlant x={-336} z={-118} />
          <StudioPlant x={352} z={-84} />

          {items.map((item) => {
            const selected = item.id === selectedId;
            return (
              <div
                key={item.id}
                className={`studio-prop studio-prop--${item.kind} ${selected ? "is-selected" : ""}`}
                style={{
                  transform: `translate3d(${item.x}px, 0px, ${item.z}px) rotateY(${item.rotation}deg)`,
                }}
              >
                <div
                  className="studio-prop__hit"
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={`${item.label[locale]} — ${dict.studio.selectObject}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(item.id);
                  }}
                  onKeyDown={(event) => handleKeyDown(event, item.id)}
                >
                  <FurnitureShape kind={item.kind} />
                  {selected && (
                    <span className="studio-prop__tag" aria-hidden="true">
                      {item.label[locale]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="studio-lights" aria-hidden="true" style={lightingVars(lighting)}>
        <span className="studio-light studio-light--key" />
        <span className="studio-light studio-light--fill" />
        <span className="studio-light studio-light--rim" />
        <span className="studio-light studio-light--ambient" />
        <span className="studio-light studio-light--shade" />
      </div>

      <div className="studio-stage__guides" aria-hidden="true">
        <span className="studio-guides__thirds" />
        <span className="studio-guides__corner studio-guides__corner--tl" />
        <span className="studio-guides__corner studio-guides__corner--tr" />
        <span className="studio-guides__corner studio-guides__corner--bl" />
        <span className="studio-guides__corner studio-guides__corner--br" />
        <span className="studio-guides__center" />
      </div>

      <div className="studio-stage__hud">
        <span className="studio-hud__camera">
          <strong>{activeCamera.short}</strong>
          <span>{activeCamera.label[locale]}</span>
        </span>
        <span className="studio-hud__scene">{sceneLabel}</span>
        <button
          type="button"
          className="studio-tally"
          data-live={onAir}
          onClick={onAirAction}
        >
          <span className="studio-tally__lamp" aria-hidden="true" />
          {dict.studio.onAir}
        </button>
        <span className="studio-hud__preview">{dict.studio.previewNotice}</span>
      </div>
    </div>
  );
}
