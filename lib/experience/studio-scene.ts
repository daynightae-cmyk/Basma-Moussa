import type { LocalizedText } from "@/lib/content/types";

/**
 * Virtual production set model.
 *
 * The stage is a real 3D scene built from CSS `preserve-3d` layers: every prop
 * carries floor coordinates (x/z, in stage units) and a Y rotation, and the
 * camera moves a shared world transform. Keeping the geometry here — pure and
 * bounded — is what lets the console prevent props from leaving the floor or
 * overlapping, and lets the camera framing follow the arrangement.
 */

export type FurnitureKind = "chair" | "table" | "mic" | "monitor" | "desk";

export interface FurnitureItem {
  id: string;
  kind: FurnitureKind;
  label: LocalizedText;
  /** Floor coordinates in stage units. x: left/right, z: toward/away. */
  x: number;
  z: number;
  /** Y rotation in degrees. */
  rotation: number;
}

export const STAGE_FLOOR = { minX: -250, maxX: 250, minZ: -160, maxZ: 160 } as const;

/** Footprint radius per kind, used for both bounds and overlap checks. */
export const FURNITURE_RADIUS: Record<FurnitureKind, number> = {
  chair: 52,
  table: 78,
  mic: 22,
  monitor: 26,
  desk: 60,
};

/** Table-top accessories (a mic, a monitor) may share space with furniture. */
const TABLE_TOP_KINDS: FurnitureKind[] = ["mic", "monitor"];

export type ScenePresetId =
  | "one-on-one"
  | "roundtable"
  | "executive"
  | "legal"
  | "podcast"
  | "documentary";

export interface ScenePreset {
  id: ScenePresetId;
  label: LocalizedText;
  note: LocalizedText;
}

function item(
  id: string,
  kind: FurnitureKind,
  label: LocalizedText,
  x: number,
  z: number,
  rotation = 0,
): FurnitureItem {
  return { id, kind, label, x, z, rotation };
}

const CHAIR_HOST: LocalizedText = { ar: "كرسي المقدّمة", en: "Host chair" };
const CHAIR_GUEST: LocalizedText = { ar: "كرسي الضيف", en: "Guest chair" };
const CHAIR_THIRD: LocalizedText = { ar: "كرسي ثالث", en: "Third chair" };
const TABLE: LocalizedText = { ar: "طاولة الحوار", en: "Interview table" };
const MIC: LocalizedText = { ar: "ميكروفون الطاولة", en: "Table microphone" };
const MONITOR: LocalizedText = { ar: "شاشة المشهد", en: "Scene monitor" };
const DESK: LocalizedText = { ar: "مكتب التحكم", en: "Control desk" };

/** Deterministic default layouts. No randomness: presets are reproducible. */
export const SCENE_LAYOUTS: Record<ScenePresetId, FurnitureItem[]> = {
  "one-on-one": [
    item("chair-host", "chair", CHAIR_HOST, -112, 40, 8),
    item("chair-guest", "chair", CHAIR_GUEST, 112, 40, -8),
    item("table", "table", TABLE, 0, -32, 0),
    item("mic", "mic", MIC, 0, -66, 0),
    item("monitor", "monitor", MONITOR, 186, -104, -18),
  ],
  roundtable: [
    item("chair-host", "chair", CHAIR_HOST, -130, 12, 22),
    item("chair-guest", "chair", CHAIR_GUEST, 128, 26, -26),
    item("chair-third", "chair", CHAIR_THIRD, 4, 138, 178),
    item("table", "table", TABLE, 0, -6, 0),
    item("mic", "mic", MIC, 0, -48, 0),
    item("monitor", "monitor", MONITOR, 190, -104, -18),
  ],
  executive: [
    item("chair-host", "chair", CHAIR_HOST, -70, 10, 16),
    item("chair-guest", "chair", CHAIR_GUEST, 76, 10, -16),
    item("table", "table", TABLE, 4, -102, 0),
    item("mic", "mic", MIC, 4, -134, 0),
    item("monitor", "monitor", MONITOR, 192, -104, -18),
  ],
  legal: [
    item("chair-host", "chair", CHAIR_HOST, -140, 22, 30),
    item("chair-guest", "chair", CHAIR_GUEST, 140, 22, -30),
    item("chair-third", "chair", CHAIR_THIRD, 0, 112, 180),
    item("table", "table", TABLE, 0, -22, 0),
    item("mic", "mic", MIC, 0, -62, 0),
    item("monitor", "monitor", MONITOR, 176, -110, -22),
  ],
  podcast: [
    item("chair-host", "chair", CHAIR_HOST, -120, 80, 6),
    item("chair-guest", "chair", CHAIR_GUEST, 120, 80, -6),
    item("table", "table", TABLE, 0, 0, 0),
    item("mic", "mic", MIC, -44, -34, 0),
    item("monitor", "monitor", MONITOR, 198, -96, -26),
    item("desk", "desk", DESK, -206, -84, 32),
  ],
  documentary: [
    item("chair-host", "chair", CHAIR_HOST, -124, 58, 14),
    item("table", "table", TABLE, 44, -12, -10),
    item("mic", "mic", MIC, -108, 12, 0),
    item("monitor", "monitor", MONITOR, 168, -112, -24),
    item("desk", "desk", DESK, 206, -70, -30),
  ],
};

export const SCENE_PRESETS: ScenePreset[] = [
  {
    id: "one-on-one",
    label: { ar: "حوار فردي", en: "One-on-one" },
    note: { ar: "مقدّمة وضيف، طاولة منخفضة.", en: "Host and guest across a low table." },
  },
  {
    id: "roundtable",
    label: { ar: "طاولة مستديرة", en: "Roundtable" },
    note: { ar: "ثلاثة مقاعد حول الطاولة.", en: "Three seats around the table." },
  },
  {
    id: "executive",
    label: { ar: "مقابلة تنفيذية", en: "Executive" },
    note: { ar: "مواجهة قريبة، طاولة خلفية.", en: "Tight two-up with the table behind." },
  },
  {
    id: "legal",
    label: { ar: "حوار قانوني", en: "Legal discussion" },
    note: { ar: "مسافة أوسع وثلاثة مقاعد.", en: "Wider spacing, three seats." },
  },
  {
    id: "podcast",
    label: { ar: "صالة بودكاست", en: "Podcast lounge" },
    note: { ar: "مقاعد مريحة وميكروفونان.", en: "Relaxed seating and close mics." },
  },
  {
    id: "documentary",
    label: { ar: "مقابلة وثائقية", en: "Documentary" },
    note: { ar: "مقدّمة وحدها، الضيف في الإطار الجانبي.", en: "Solo subject, guest off-axis." },
  },
];

export function layoutFor(presetId: ScenePresetId): FurnitureItem[] {
  return SCENE_LAYOUTS[presetId].map((entry) => ({ ...entry }));
}

export function clampToFloor(x: number, z: number): { x: number; z: number } {
  return {
    x: Math.min(STAGE_FLOOR.maxX, Math.max(STAGE_FLOOR.minX, x)),
    z: Math.min(STAGE_FLOOR.maxZ, Math.max(STAGE_FLOOR.minZ, z)),
  };
}

function overlaps(a: FurnitureItem, b: FurnitureItem): boolean {
  if (TABLE_TOP_KINDS.includes(a.kind) || TABLE_TOP_KINDS.includes(b.kind)) return false;
  const minDistance = FURNITURE_RADIUS[a.kind] + FURNITURE_RADIUS[b.kind];
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz) < minDistance;
}

/**
 * Move one prop. Returns the unchanged array when the target position would
 * leave the floor or intersect another prop, so the stage can never end up with
 * furniture clipped through the set or floating outside it.
 */
export function moveItem(
  items: FurnitureItem[],
  id: string,
  dx: number,
  dz: number,
): FurnitureItem[] {
  const target = items.find((entry) => entry.id === id);
  if (!target) return items;
  const { x, z } = clampToFloor(target.x + dx, target.z + dz);
  if (x === target.x && z === target.z) return items;
  const moved = { ...target, x, z };
  if (items.some((entry) => entry.id !== id && overlaps(moved, entry))) return items;
  return items.map((entry) => (entry.id === id ? moved : entry));
}

export function rotateItem(
  items: FurnitureItem[],
  id: string,
  deltaDegrees: number,
): FurnitureItem[] {
  return items.map((entry) =>
    entry.id === id
      ? { ...entry, rotation: normaliseAngle(entry.rotation + deltaDegrees) }
      : entry,
  );
}

export function normaliseAngle(degrees: number): number {
  const wrapped = ((degrees % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

/** True when the layout is physically valid: inside bounds and non-overlapping. */
export function isValidLayout(items: FurnitureItem[]): boolean {
  for (const entry of items) {
    const { x, z } = clampToFloor(entry.x, entry.z);
    if (x !== entry.x || z !== entry.z) return false;
  }
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      if (overlaps(items[i], items[j])) return false;
    }
  }
  return true;
}

export type CameraId = "master" | "host" | "guest" | "two-shot" | "side" | "overhead";

export interface CameraPreset {
  id: CameraId;
  label: LocalizedText;
  short: string;
  yaw: number;
  pitch: number;
  /** Positive dollies toward the set, negative pulls back. */
  dolly: number;
  trackX: number;
  trackY: number;
  fov: number;
}

export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: "master",
    label: { ar: "اللقطة الواسعة", en: "Master wide" },
    short: "CAM 01",
    yaw: 0,
    pitch: 9,
    dolly: 0,
    trackX: 0,
    trackY: 0,
    fov: 46,
  },
  {
    id: "host",
    label: { ar: "لقطة المقدّمة", en: "Host close-up" },
    short: "CAM 02",
    yaw: 13,
    pitch: 3,
    dolly: 300,
    trackX: 112,
    trackY: -16,
    fov: 34,
  },
  {
    id: "guest",
    label: { ar: "لقطة الضيف", en: "Guest close-up" },
    short: "CAM 03",
    yaw: -13,
    pitch: 3,
    dolly: 300,
    trackX: -112,
    trackY: -16,
    fov: 34,
  },
  {
    id: "two-shot",
    label: { ar: "لقطة مشتركة", en: "Two shot" },
    short: "CAM 04",
    yaw: 0,
    pitch: 5,
    dolly: 150,
    trackX: 0,
    trackY: -14,
    fov: 40,
  },
  {
    id: "side",
    label: { ar: "زاوية سينمائية", en: "Cinematic side" },
    short: "CAM 05",
    yaw: 36,
    pitch: 7,
    dolly: 70,
    trackX: -26,
    trackY: -8,
    fov: 44,
  },
  {
    id: "overhead",
    label: { ar: "من الأعلى", en: "Overhead" },
    short: "CAM 06",
    yaw: 0,
    pitch: 54,
    dolly: -30,
    trackX: 0,
    trackY: 74,
    fov: 50,
  },
];

export function cameraPreset(id: CameraId): CameraPreset {
  return CAMERA_PRESETS.find((entry) => entry.id === id) ?? CAMERA_PRESETS[0];
}

/** Shared world transform for the selected camera (CSS transform string). */
export function cameraTransform(id: CameraId): string {
  const camera = cameraPreset(id);
  return [
    `translate3d(${camera.trackX}px, ${camera.trackY}px, ${camera.dolly}px)`,
    `rotateX(${camera.pitch}deg)`,
    `rotateY(${camera.yaw}deg)`,
  ].join(" ");
}

export type LightingPresetId =
  | "warm-broadcast"
  | "champagne-editorial"
  | "midnight-cinema"
  | "blue-hour"
  | "soft-interview"
  | "dramatic-documentary"
  | "clean-white";

export interface LightingPreset {
  id: LightingPresetId;
  label: LocalizedText;
  keyColor: string;
  fillColor: string;
  rimColor: string;
  wallTop: string;
  wallBottom: string;
  /** 0..1 baseline intensities. */
  key: number;
  fill: number;
  rim: number;
  ambient: number;
  temperature: number;
}

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "warm-broadcast",
    label: { ar: "بثّ دافئ", en: "Warm broadcast" },
    keyColor: "#ffd9a0",
    fillColor: "#8fa6cc",
    rimColor: "#f4c987",
    wallTop: "#1b2238",
    wallBottom: "#0a0e1a",
    key: 0.86,
    fill: 0.4,
    rim: 0.5,
    ambient: 0.42,
    temperature: 0.68,
  },
  {
    id: "champagne-editorial",
    label: { ar: "تحريري شامبانيا", en: "Champagne editorial" },
    keyColor: "#f7e2bd",
    fillColor: "#b9a58a",
    rimColor: "#e8c98d",
    wallTop: "#2a2436",
    wallBottom: "#100c17",
    key: 0.8,
    fill: 0.52,
    rim: 0.42,
    ambient: 0.5,
    temperature: 0.74,
  },
  {
    id: "midnight-cinema",
    label: { ar: "سينما منتصف الليل", en: "Midnight cinema" },
    keyColor: "#c9d8ff",
    fillColor: "#3f5988",
    rimColor: "#8fb4ff",
    wallTop: "#0d1630",
    wallBottom: "#050810",
    key: 0.58,
    fill: 0.3,
    rim: 0.66,
    ambient: 0.24,
    temperature: 0.26,
  },
  {
    id: "blue-hour",
    label: { ar: "الساعة الزرقاء", en: "Documentary blue hour" },
    keyColor: "#a8c6ff",
    fillColor: "#5b78a8",
    rimColor: "#9fd0ff",
    wallTop: "#11203a",
    wallBottom: "#060b16",
    key: 0.62,
    fill: 0.46,
    rim: 0.38,
    ambient: 0.34,
    temperature: 0.18,
  },
  {
    id: "soft-interview",
    label: { ar: "حوار ناعم", en: "Soft interview" },
    keyColor: "#ffe7cd",
    fillColor: "#cbbfae",
    rimColor: "#f0dcc2",
    wallTop: "#20222c",
    wallBottom: "#0b0c12",
    key: 0.7,
    fill: 0.62,
    rim: 0.24,
    ambient: 0.56,
    temperature: 0.6,
  },
  {
    id: "dramatic-documentary",
    label: { ar: "وثائقي درامي", en: "Dramatic documentary" },
    keyColor: "#ffcf9a",
    fillColor: "#31435f",
    rimColor: "#ffb066",
    wallTop: "#141522",
    wallBottom: "#04050a",
    key: 0.92,
    fill: 0.16,
    rim: 0.8,
    ambient: 0.16,
    temperature: 0.55,
  },
  {
    id: "clean-white",
    label: { ar: "أبيض مهني", en: "Clean professional white" },
    keyColor: "#ffffff",
    fillColor: "#dfe6f2",
    rimColor: "#ffffff",
    wallTop: "#39404f",
    wallBottom: "#151922",
    key: 0.9,
    fill: 0.74,
    rim: 0.3,
    ambient: 0.7,
    temperature: 0.5,
  },
];

export function lightingPreset(id: LightingPresetId): LightingPreset {
  return LIGHTING_PRESETS.find((entry) => entry.id === id) ?? LIGHTING_PRESETS[0];
}

export interface LightingState {
  presetId: LightingPresetId;
  key: number;
  fill: number;
  rim: number;
  ambient: number;
  temperature: number;
}

export function lightingForPreset(presetId: LightingPresetId): LightingState {
  const preset = lightingPreset(presetId);
  return {
    presetId,
    key: preset.key,
    fill: preset.fill,
    rim: preset.rim,
    ambient: preset.ambient,
    temperature: preset.temperature,
  };
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function mixHex(cool: string, warm: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [cr, cg, cb] = parse(cool);
  const [wr, wg, wb] = parse(warm);
  const ratio = clamp01(t);
  const blend = (a: number, b: number) => Math.round(a + (b - a) * ratio);
  return `rgb(${blend(cr, wr)}, ${blend(cg, wg)}, ${blend(cb, wb)})`;
}

/** CSS custom properties consumed by the stage. Real, visible lighting change. */
export function lightingVars(state: LightingState): Record<string, string> {
  const preset = lightingPreset(state.presetId);
  const key = clamp01(state.key);
  const fill = clamp01(state.fill);
  const rim = clamp01(state.rim);
  const ambient = clamp01(state.ambient);
  const temperature = clamp01(state.temperature);
  return {
    "--studio-key": preset.keyColor,
    "--studio-fill": preset.fillColor,
    "--studio-rim": preset.rimColor,
    "--studio-wall-top": preset.wallTop,
    "--studio-wall-bottom": preset.wallBottom,
    "--studio-key-strength": key.toFixed(2),
    "--studio-fill-strength": fill.toFixed(2),
    "--studio-rim-strength": rim.toFixed(2),
    "--studio-ambient": ambient.toFixed(2),
    "--studio-warmth": mixHex("#4a6da8", "#ffb066", temperature),
    "--studio-shadow": (0.28 + (1 - fill) * 0.3).toFixed(2),
  };
}
