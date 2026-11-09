"use client";

import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import {
  CAMERA_PRESETS,
  LIGHTING_PRESETS,
  SCENE_PRESETS,
  type CameraId,
  type FurnitureItem,
  type LightingPresetId,
  type LightingState,
  type ScenePresetId,
} from "@/lib/experience/studio-scene";

interface SetConsoleProps {
  dict: Dictionary;
  locale: Locale;
  camera: CameraId;
  sceneId: ScenePresetId;
  lighting: LightingState;
  items: FurnitureItem[];
  selectedId: string | null;
  onCamera: (id: CameraId) => void;
  onScene: (id: ScenePresetId) => void;
  onLightingPreset: (id: LightingPresetId) => void;
  onLightingChange: (key: "key" | "fill" | "rim" | "ambient" | "temperature", value: number) => void;
  onSelect: (id: string | null) => void;
  onNudge: (id: string, dx: number, dz: number) => void;
  onRotate: (id: string, delta: number) => void;
  onResetLayout: () => void;
  onResetCamera: () => void;
}

const SLIDERS = [
  { key: "key", label: "keyLight" },
  { key: "fill", label: "fillLight" },
  { key: "rim", label: "rimLight" },
  { key: "ambient", label: "ambient" },
  { key: "temperature", label: "temperature" },
] as const;

export function SetConsole({
  dict,
  locale,
  camera,
  sceneId,
  lighting,
  items,
  selectedId,
  onCamera,
  onScene,
  onLightingPreset,
  onLightingChange,
  onSelect,
  onNudge,
  onRotate,
  onResetLayout,
  onResetCamera,
}: SetConsoleProps) {
  const selected = items.find((item) => item.id === selectedId) ?? null;

  return (
    <div className="set-console">
      <section className="console-panel" aria-labelledby="studio-cameras">
        <header className="console-panel__head">
          <h3 id="studio-cameras">{dict.studio.cameras}</h3>
          <button type="button" className="console-link" onClick={onResetCamera}>
            {dict.studio.resetCamera}
          </button>
        </header>
        <div className="camera-grid">
          {CAMERA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="camera-btn"
              aria-pressed={camera === preset.id}
              onClick={() => onCamera(preset.id)}
            >
              <span className="camera-btn__code">{preset.short}</span>
              <span className="camera-btn__label">{preset.label[locale]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="console-panel" aria-labelledby="studio-scenes">
        <header className="console-panel__head">
          <h3 id="studio-scenes">{dict.studio.scene}</h3>
        </header>
        <div className="scene-chips">
          {SCENE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="scene-chip"
              aria-pressed={sceneId === preset.id}
              onClick={() => onScene(preset.id)}
              title={preset.note[locale]}
            >
              {preset.label[locale]}
            </button>
          ))}
        </div>
        <p className="console-note">
          {SCENE_PRESETS.find((preset) => preset.id === sceneId)?.note[locale]}
        </p>
      </section>

      <section className="console-panel" aria-labelledby="studio-lighting">
        <header className="console-panel__head">
          <h3 id="studio-lighting">{dict.studio.lighting}</h3>
        </header>
        <div className="scene-chips scene-chips--tight">
          {LIGHTING_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="scene-chip scene-chip--light"
              aria-pressed={lighting.presetId === preset.id}
              onClick={() => onLightingPreset(preset.id)}
              style={{
                backgroundImage: `linear-gradient(120deg, ${preset.keyColor}, ${preset.wallTop})`,
              }}
            >
              <span>{preset.label[locale]}</span>
            </button>
          ))}
        </div>
        <div className="light-sliders">
          {SLIDERS.map((slider) => {
            const value = Math.round(lighting[slider.key] * 100);
            return (
              <label key={slider.key} className="light-slider">
                <span className="light-slider__label">{dict.studio[slider.label]}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={value}
                  onChange={(event) =>
                    onLightingChange(slider.key, Number(event.target.value) / 100)
                  }
                  aria-valuetext={`${value}%`}
                />
                <span className="light-slider__value">{value}%</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="console-panel" aria-labelledby="studio-furniture">
        <header className="console-panel__head">
          <h3 id="studio-furniture">{dict.studio.furniture}</h3>
          <button type="button" className="console-link" onClick={onResetLayout}>
            {dict.studio.resetLayout}
          </button>
        </header>
        <ul className="furniture-list" aria-label={dict.studio.furniture}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="furniture-btn"
                aria-pressed={selectedId === item.id}
                onClick={() => onSelect(item.id)}
              >
                <span className="furniture-btn__kind" aria-hidden="true" data-kind={item.kind} />
                <span>{item.label[locale]}</span>
              </button>
            </li>
          ))}
        </ul>

        {selected ? (
          <div className="nudge-pad">
            <p className="nudge-pad__title">
              {selected.label[locale]}
              <span className="nudge-pad__badge">{dict.studio.selected}</span>
            </p>
            <div className="nudge-pad__grid">
              <button
                type="button"
                className="nudge-btn nudge-btn--up"
                onClick={() => onNudge(selected.id, 0, -8)}
                aria-label={dict.studio.moveUp}
              >
                <span aria-hidden="true">↑</span>
              </button>
              <button
                type="button"
                className="nudge-btn nudge-btn--left"
                onClick={() => onNudge(selected.id, -8, 0)}
                aria-label={dict.studio.moveLeft}
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="nudge-pad__core" aria-hidden="true" />
              <button
                type="button"
                className="nudge-btn nudge-btn--right"
                onClick={() => onNudge(selected.id, 8, 0)}
                aria-label={dict.studio.moveRight}
              >
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="nudge-btn nudge-btn--down"
                onClick={() => onNudge(selected.id, 0, 8)}
                aria-label={dict.studio.moveDown}
              >
                <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="nudge-pad__rotate">
              <button
                type="button"
                className="nudge-btn"
                onClick={() => onRotate(selected.id, -15)}
                aria-label={dict.studio.rotateLeft}
              >
                <span aria-hidden="true">⟲</span>
              </button>
              <button
                type="button"
                className="nudge-btn"
                onClick={() => onRotate(selected.id, 15)}
                aria-label={dict.studio.rotateRight}
              >
                <span aria-hidden="true">⟳</span>
              </button>
              <span className="nudge-pad__angle">{Math.round(selected.rotation)}°</span>
            </div>
            <p className="console-note">{dict.studio.keyboardHint}</p>
          </div>
        ) : (
          <p className="console-note">{dict.studio.selectObject}</p>
        )}
      </section>
    </div>
  );
}
