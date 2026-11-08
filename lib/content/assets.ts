import rawAssets from "@/content/media-assets.json";
import blurPlaceholders from "@/content/image-placeholders.json";
import { mediaAssetsFileSchema } from "./schemas";
import type { FocalPoint, MediaAsset } from "./types";

const FOCAL_POINTS: Record<string, FocalPoint> = {
  "bm-01": { x: 50, y: 55 },
  "bm-02": { x: 50, y: 32 },
  "bm-03": { x: 50, y: 45 },
  "bm-04": { x: 48, y: 55 },
  "bm-05": { x: 50, y: 30 },
  "bm-06": { x: 50, y: 50 },
  "bm-07": { x: 55, y: 50 },
  "bm-08": { x: 55, y: 45 },
  "bm-09": { x: 55, y: 50 },
  "bm-10": { x: 50, y: 32 },
  "bm-11": { x: 45, y: 55 },
  "bm-12": { x: 62, y: 50 },
  "bm-13": { x: 50, y: 50 },
  "bm-14": { x: 32, y: 45 },
};

const parsed = mediaAssetsFileSchema.parse(rawAssets);

export const assets: MediaAsset[] = parsed.assets.map((asset) => {
  const blurDataURL = (blurPlaceholders as Record<string, string>)[asset.id];
  if (!blurDataURL) {
    throw new Error(`Missing blur placeholder for asset: ${asset.id}`);
  }
  return {
    ...asset,
    focalPoint: FOCAL_POINTS[asset.id] ?? { x: 50, y: 50 },
    blurDataURL,
  };
});

const assetIndex = new Map(assets.map((asset) => [asset.id, asset]));

export const sourceAuditDate = parsed.sourceAuditDate;

export function getAsset(id: string): MediaAsset {
  const asset = assetIndex.get(id);
  if (!asset) {
    throw new Error(`Unknown media asset: ${id}`);
  }
  return asset;
}

export const BRAND_LOGO = getAsset("bm-06");
export const HOME_HERO = getAsset("bm-14");
