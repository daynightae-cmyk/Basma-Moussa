import type { Locale } from "@/lib/i18n/config";

export type LocalizedText = { ar: string; en: string };

export type PublicationStatus =
  | "concept"
  | "in-development"
  | "draft"
  | "review"
  | "published"
  | "archived";

export type AssetProvenance =
  | "user-supplied-ai-concept"
  | "user-approved-brand";

export type AssetEditorialStatus =
  | "illustrative-review-required"
  | "brand-approved";

export type ProgramCategory = "conversation" | "legal" | "documentary" | "audio";

export type FocalPoint = { x: number; y: number };

export interface MediaAsset {
  id: string;
  sourceRef: string;
  src: string;
  originalUrl: string;
  width: number;
  height: number;
  title: string;
  alt: LocalizedText;
  pages: string[];
  provenance: AssetProvenance;
  editorialStatus: AssetEditorialStatus;
  publishedClaimAllowed: boolean;
  focalPoint: FocalPoint;
  blurDataURL: string;
}

export interface ProgramRecord {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  episodeIds: string[];
  heroAssetId: string;
}

export interface ProgramWorld extends ProgramRecord {
  category: ProgramCategory;
  worldName: LocalizedText;
  tagline: LocalizedText;
  atmosphere: LocalizedText;
  introduction: LocalizedText;
  formats: { title: LocalizedText; body: LocalizedText }[];
  gates: LocalizedText[];
  statusNote: LocalizedText;
  quote: LocalizedText;
  experienceHref: string;
  experienceLabel: LocalizedText;
  secondaryAssetId: string;
}

export interface OfficialSource {
  id: string;
  url: string;
  name: string;
  kind:
    | "official-legal-reference"
    | "official-news-reference"
    | "official-data-reference";
  verifiedAsWebsiteEntryPoint: boolean;
  apiVerified: boolean;
  publisher: LocalizedText;
  description: LocalizedText;
  jurisdiction: "UAE-federal" | "Dubai" | "Sharjah" | "global";
  retrievedAt: string;
  licenseReviewed: boolean;
}

export interface LegalOutline {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  jurisdiction: LocalizedText;
  status: "outline";
  sourceIds: string[];
  note: LocalizedText;
}

export interface WorldCard {
  id: string;
  href: string;
  assetId: string;
  kicker: LocalizedText;
  title: LocalizedText;
  teaser: LocalizedText;
  status: PublicationStatus;
  category: ProgramCategory;
  variant: "wide" | "tall";
}

export interface MediaWorldEntry extends WorldCard {
  programSlug: string;
  searchText: LocalizedText;
}

export interface SecondaryWorldCard {
  id: string;
  href: string;
  assetId: string;
  kicker: LocalizedText;
  title: LocalizedText;
  teaser: LocalizedText;
}

/**
 * Widens literal strings so a second language can be checked against the
 * shape of the first without pretending the copy is identical.
 */
export type CopyShape<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? CopyShape<U>[]
        : { [K in keyof T]: CopyShape<T[K]> };

export type LocalizedPair<T> = { ar: T; en: CopyShape<T> };

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
