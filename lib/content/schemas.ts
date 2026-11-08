import { z } from "zod";

const localizedTextSchema = z.object({
  ar: z.string().trim().min(1),
  en: z.string().trim().min(1),
});

const httpsUrl = z
  .string()
  .trim()
  .regex(/^https:\/\/[^\s]+$/, "Expected an https URL");

export const mediaAssetSchema = z.object({
  id: z.string().trim().min(1),
  sourceRef: z.string().trim().min(1),
  src: z
    .string()
    .trim()
    .regex(/^\/(media|brand)\/[a-z0-9._-]+\.(webp|png|jpg|jpeg)$/i),
  originalUrl: httpsUrl,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  title: z.string().trim().min(1),
  alt: localizedTextSchema,
  pages: z.array(z.string()).min(1),
  provenance: z.enum(["user-supplied-ai-concept", "user-approved-brand"]),
  editorialStatus: z.enum(["illustrative-review-required", "brand-approved"]),
  publishedClaimAllowed: z.boolean(),
  focalPoint: z
    .object({ x: z.number().min(0).max(100), y: z.number().min(0).max(100) })
    .optional(),
});

export const mediaAssetsFileSchema = z
  .object({
    schemaVersion: z.literal(1),
    sourceAuditDate: z.string().trim().min(1),
    usage: z.string().trim().min(1),
    assetCount: z.number().int().nonnegative(),
    assets: z.array(mediaAssetSchema).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.assetCount !== data.assets.length) {
      ctx.addIssue({
        code: "custom",
        message: `assetCount ${data.assetCount} does not match ${data.assets.length} records`,
      });
    }
    const ids = new Set<string>();
    const sources = new Set<string>();
    for (const asset of data.assets) {
      if (ids.has(asset.id)) {
        ctx.addIssue({ code: "custom", message: `Duplicate asset id ${asset.id}` });
      }
      if (sources.has(asset.src)) {
        ctx.addIssue({ code: "custom", message: `Duplicate asset src ${asset.src}` });
      }
      ids.add(asset.id);
      sources.add(asset.src);

      if (
        asset.provenance === "user-supplied-ai-concept" &&
        (asset.publishedClaimAllowed || asset.editorialStatus !== "illustrative-review-required")
      ) {
        ctx.addIssue({
          code: "custom",
          message: `Illustrative asset ${asset.id} must stay review-required and claim-disallowed`,
        });
      }
    }
  });

export const programSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: localizedTextSchema,
  description: localizedTextSchema,
  status: z.enum([
    "concept",
    "in-development",
    "draft",
    "review",
    "published",
    "archived",
  ]),
  episodeIds: z.array(z.string()),
  heroAssetId: z.string().trim().min(1),
});

export const programsFileSchema = z
  .object({
    schemaVersion: z.literal(1),
    programs: z.array(programSchema).min(1),
  })
  .superRefine((data, ctx) => {
    const slugs = new Set<string>();
    for (const program of data.programs) {
      if (slugs.has(program.slug)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate program slug ${program.slug}`,
        });
      }
      slugs.add(program.slug);

      if (program.status !== "published" && program.episodeIds.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `Program ${program.slug} lists episodes without a published status`,
        });
      }
    }
  });

export const officialSourceSchema = z.object({
  id: z.string().trim().min(1),
  url: httpsUrl,
  name: z.string().trim().min(1),
  kind: z.enum([
    "official-legal-reference",
    "official-news-reference",
    "official-data-reference",
  ]),
  verifiedAsWebsiteEntryPoint: z.boolean(),
  apiVerified: z.boolean(),
});

export const officialSourcesFileSchema = z
  .object({
    reviewedDate: z.string().trim().min(1),
    meaning: z.string().trim().min(1),
    sources: z.array(officialSourceSchema).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.sources.some((source) => source.apiVerified)) {
      ctx.addIssue({
        code: "custom",
        message:
          "No source may claim a verified API until one is actually configured",
      });
    }
    const ids = new Set<string>();
    for (const source of data.sources) {
      if (ids.has(source.id)) {
        ctx.addIssue({ code: "custom", message: `Duplicate source id ${source.id}` });
      }
      ids.add(source.id);
    }
  });
