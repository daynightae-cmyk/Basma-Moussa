"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import {
  CAMERA_PRESETS,
  LIGHTING_PRESETS,
  SCENE_LAYOUTS,
  SCENE_PRESETS,
  layoutFor,
  lightingForPreset,
  lightingPreset,
  moveItem,
  rotateItem,
  type CameraId,
  type FurnitureItem,
  type LightingPresetId,
  type LightingState,
  type ScenePresetId,
} from "@/lib/experience/studio-scene";
import {
  broadcastReducer,
  initialBroadcastState,
} from "@/lib/experience/broadcast-machine";
import { StudioStage } from "@/components/studio/studio-stage";
import { SetConsole } from "@/components/studio/set-console";
import { DirectorRoom, type DeviceStatus } from "@/components/studio/director-room";

const STORAGE_KEY = "bm-studio-state-v1";

interface PersistedStudio {
  sceneId: ScenePresetId;
  camera: CameraId;
  lighting: LightingState;
  prompter: string;
  notes: string;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

export function StudioExperience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [sceneId, setSceneId] = useState<ScenePresetId>("one-on-one");
  const [items, setItems] = useState<FurnitureItem[]>(() => layoutFor("one-on-one"));
  const [selectedId, setSelectedId] = useState<string | null>("chair-host");
  const [camera, setCamera] = useState<CameraId>("master");
  const [lighting, setLighting] = useState<LightingState>(() =>
    lightingForPreset("warm-broadcast"),
  );
  const [prompter, setPrompter] = useState("");
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [clock, setClock] = useState<string | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({ kind: "unknown" });

  // No streaming transport and no producer session exist in this build, so the
  // ON AIR machine starts from those facts rather than from an optimistic guess.
  const [broadcast, dispatchBroadcast] = useReducer(
    broadcastReducer,
    initialBroadcastState(false, false),
  );

  const loadedRef = useRef(false);

  // One-time restore from device storage after hydration (storage is browser-only).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistedStudio>;
        if (saved.sceneId && SCENE_LAYOUTS[saved.sceneId]) {
          setSceneId(saved.sceneId);
          setItems(layoutFor(saved.sceneId));
        }
        if (saved.camera && CAMERA_PRESETS.some((preset) => preset.id === saved.camera)) {
          setCamera(saved.camera);
        }
        if (
          saved.lighting &&
          LIGHTING_PRESETS.some((preset) => preset.id === saved.lighting?.presetId)
        ) {
          setLighting(saved.lighting);
        }
        if (typeof saved.prompter === "string") setPrompter(saved.prompter);
        if (typeof saved.notes === "string") setNotes(saved.notes);
      }
    } catch {
      // Corrupt or unavailable storage: keep the deterministic defaults.
    }
    loadedRef.current = true;
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      const payload: PersistedStudio = { sceneId, camera, lighting, prompter, notes };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage may be disabled; the session still works in memory.
    }
  }, [camera, lighting, notes, prompter, sceneId]);

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(() => {
      setSeconds((previous) => previous + 1);
      tick();
    }, 1000);
    return () => clearInterval(id);
  }, [locale]);

  const onScene = useCallback((id: ScenePresetId) => {
    setSceneId(id);
    setItems(layoutFor(id));
  }, []);

  const onCamera = useCallback((id: CameraId) => setCamera(id), []);

  const onLightingPreset = useCallback((id: LightingPresetId) => {
    setLighting(lightingForPreset(id));
  }, []);

  const onLightingChange = useCallback(
    (key: "key" | "fill" | "rim" | "ambient" | "temperature", value: number) => {
      setLighting((previous) => {
        // A manual slider move is a custom mix of the active preset.
        const preset = lightingPreset(previous.presetId);
        return { ...previous, presetId: preset.id, [key]: value };
      });
    },
    [],
  );

  const onNudge = useCallback((id: string, dx: number, dz: number) => {
    setItems((previous) => moveItem(previous, id, dx, dz));
  }, []);

  const onRotate = useCallback((id: string, delta: number) => {
    setItems((previous) => rotateItem(previous, id, delta));
  }, []);

  const onResetLayout = useCallback(() => {
    setItems(layoutFor(sceneId));
  }, [sceneId]);

  const onResetCamera = useCallback(() => setCamera("master"), []);

  const checkDevices = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.enumerateDevices) {
      setDeviceStatus({ kind: "unsupported" });
      return;
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputs = devices.filter((device) => device.kind === "audioinput");
      setDeviceStatus(
        inputs.length > 0 ? { kind: "found", count: inputs.length } : { kind: "none" },
      );
    } catch {
      setDeviceStatus({ kind: "denied" });
    }
  }, []);

  const sceneLabel = useMemo(
    () => SCENE_PRESETS.find((preset) => preset.id === sceneId)?.label[locale] ?? "",
    [locale, sceneId],
  );

  return (
    <section className="studio-experience" id="studio-experience" aria-labelledby="studio-experience-title">
      <div className="shell shell--wide">
        <header className="studio-experience__head">
          <div>
            <p className="eyebrow eyebrow-gold">{dict.nav.studio}</p>
            <h2 id="studio-experience-title" className="display display-m">
              {dict.studio.experienceTitle}
            </h2>
            <p className="lead">{dict.studio.experienceLead}</p>
          </div>
          <p className="studio-preview-badge">{dict.studio.previewNotice}</p>
        </header>

        <div className="studio-layout">
          <div className="studio-layout__stage">
            <StudioStage
              dict={dict}
              locale={locale}
              items={items}
              selectedId={selectedId}
              camera={camera}
              lighting={lighting}
              prompter={prompter}
              elapsed={formatDuration(seconds)}
              sceneLabel={sceneLabel}
              onSelect={setSelectedId}
              onNudge={onNudge}
              onRotate={onRotate}
            />
          </div>

          <div className="studio-layout__console">
            <SetConsole
              dict={dict}
              locale={locale}
              camera={camera}
              sceneId={sceneId}
              lighting={lighting}
              items={items}
              selectedId={selectedId}
              onCamera={onCamera}
              onScene={onScene}
              onLightingPreset={onLightingPreset}
              onLightingChange={onLightingChange}
              onSelect={setSelectedId}
              onNudge={onNudge}
              onRotate={onRotate}
              onResetLayout={onResetLayout}
              onResetCamera={onResetCamera}
            />
            <DirectorRoom
              dict={dict}
              broadcast={broadcast}
              onBroadcast={dispatchBroadcast}
              clock={clock}
              elapsed={formatDuration(seconds)}
              prompter={prompter}
              notes={notes}
              onPrompter={setPrompter}
              onNotes={setNotes}
              deviceStatus={deviceStatus}
              onCheckDevices={checkDevices}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
