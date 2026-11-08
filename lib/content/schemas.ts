import { z } from "zod";

export const localizedTextSchema = z.object({
  ar: z.string().min(1),
  en: z.string().min(1),
});

export const focalPointSchema = z.object({
  x: z.number().int().min(0).max(100),
  y: z.number().int().min(0).max(100),
});

export const assetRecordSchema = z.object({
  id: z.string().min(1),
  sourceRef: z.string().min(1),
  src: z.string().regex(/^\/(media|brand)\/[^/]+\.(webp|png)$/),
  originalUrl: z.string().regex(/^https?:\/\//).optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  title: z.string().min(1),
  alt: localizedTextSchema,
  pages: z.array(z.string().min(1)).nonempty(),
  provenance: z.enum(["user-approved-brand", "user-supplied-ai-concept"]),
  editorialStatus: z.enum([
    "brand-approved",
    "illustrative-review-required",
  ]),
  publishedClaimAllowed: z.boolean(),
});

export const mediaAssetsSchema = z.object({
  schemaVersion: z.literal(1),
  sourceAuditDate: z.string().min(1),
  usage: z.string().min(1),
  assetCount: z.number().int().positive(),
  assets: z.array(assetRecordSchema).nonempty(),
});

export const officialSourceSchema = z.object({
  id: z.string().min(1),
  url: z.string().regex(/^https?:\/\//),
  name: z.string().min(1),
  kind: z.enum([
    "official-legal-reference",
    "official-news-reference",
    "official-data-reference",
  ]),
  verifiedAsWebsiteEntryPoint: z.boolean(),
  apiVerified: z.boolean(),
  jurisdiction: z.string().optional(),
  localContext: localizedTextSchema.optional(),
});

export const officialSourcesSchema = z.object({
  reviewedDate: z.string().min(1),
  meaning: z.string().min(1),
  sources: z.array(officialSourceSchema).nonempty(),
});

export const programRecordSchema = z.object({
  slug: z.string().min(1),
  title: localizedTextSchema,
  description: localizedTextSchema,
  status: z.enum([
    "concept",
    "draft",
    "review",
    "published",
    "archived",
  ]),
  episodeIds: z.array(z.string().min(1)).optional().default([]),
  heroAssetId: z.string().min(1),
});

export const programsSchema = z.object({
  schemaVersion: z.literal(1),
  programs: z.array(programRecordSchema).nonempty(),
});

export const legalOutlineSchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  summary: localizedTextSchema,
  jurisdiction: z.string().min(1),
  status: z.literal("outline"),
  sourceIds: z.array(z.string().min(1)).nonempty(),
  note: localizedTextSchema,
});

export type AssetRecord = z.infer<typeof assetRecordSchema>;
export type OfficialSourceRecord = z.infer<typeof officialSourceSchema>;
export type ProgramRecordBase = z.infer<typeof programRecordSchema>;
export type LegalOutlineRecord = z.infer<typeof legalOutlineSchema>;

export function validateMediaAssets(input: unknown) {
  return mediaAssetsSchema.parse(input);
}
export function validateOfficialSources(input: unknown) {
  return officialSourcesSchema.parse(input);
}
export function validatePrograms(input: unknown) {
  return programsSchema.parse(input);
}
export function validateLegalOutlines(input: unknown) {
  return z.object({ outlines: z.array(legalOutlineSchema) }).parse(input);
}
