import {
  validateMediaAssets,
  type AssetRecord,
} from "@/lib/content/schemas";
import mediaAssetsJson from "@/content/media-assets.json";

const validated = validateMediaAssets(mediaAssetsJson);

const focalPoints: Record<string, { x: number; y: number }> = {
  "bm-01": { x: 48, y: 42 }, // voice identity: waveform/lotus centered
  "bm-02": { x: 50, y: 34 }, // about portrait
  "bm-03": { x: 50, y: 46 }, // legal dialogue
  "bm-04": { x: 50, y: 52 }, // legal lens
  "bm-05": { x: 50, y: 28 }, // professional portrait
  "bm-06": { x: 50, y: 50 }, // approved logo
  "bm-07": { x: 52, y: 48 }, // legal research detail
  "bm-08": { x: 52, y: 46 }, // contact atmosphere
  "bm-09": { x: 55, y: 48 }, // media universe studio
  "bm-10": { x: 50, y: 32 }, // alternate portrait
  "bm-11": { x: 48, y: 56 }, // Sharjah waterfront
  "bm-12": { x: 50, y: 50 }, // interview studio
  "bm-13": { x: 50, y: 50 }, // documentary archive
  "bm-14": { x: 52, y: 46 }, // home hero: face left, text-safe right
};

export const ASSETS: AssetRecord[] = validated.assets.map((asset) => ({
  ...asset,
  focalPoint: focalPoints[asset.id] ?? { x: 50, y: 50 },
}));

export function getAsset(id: string): AssetRecord {
  const asset = ASSETS.find((item) => item.id === id);
  if (!asset) throw new Error(`Unknown media asset: ${id}`);
  return asset;
}

export function getAssetBySrc(src: string): AssetRecord {
  const asset = ASSETS.find((item) => item.src === src);
  if (!asset) throw new Error(`Unknown media asset src: ${src}`);
  return asset;
}

export function assetsForPage(page: string): AssetRecord[] {
  return ASSETS.filter((asset) => asset.pages.includes(page));
}

export function isIllustrative(id: string): boolean {
  return getAsset(id).provenance === "user-supplied-ai-concept";
}

export const BRAND_LOGO_ID = "bm-06";
export const BRAND_ICON_ID = "icon-circle";
