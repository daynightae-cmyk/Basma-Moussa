export type LocalizedText = { ar: string; en: string };
export type Localized<T extends Record<string, unknown>> = {
  ar: T;
  en: T;
};
export type LocalizedForm<T extends Record<string, unknown>> = {
  ar: T;
  en: T;
};
export type LocaleDirection = "rtl" | "ltr";

export type PublicationStatus =
  | "concept"
  | "draft"
  | "review"
  | "published"
  | "archived";
export type AssetSource =
  | "user-approved-brand"
  | "user-supplied-ai-concept";
export type EditorialStatus = "brand-approved" | "illustrative-review-required";
export type SourceKind =
  | "official-legal-reference"
  | "official-news-reference"
  | "official-data-reference";

export interface FocalPoint {
  x: number; // 0-100
  y: number; // 0-100
}

export interface MediaAssetRecord {
  id: string;
  sourceRef: string;
  src: string; // /media/... or /brand/...
  originalUrl?: string;
  width: number;
  height: number;
  title: LocalizedText;
  alt: LocalizedText;
  pages: string[];
  provenance: AssetSource;
  editorialStatus: EditorialStatus;
  publishedClaimAllowed: boolean;
  focalPoint: FocalPoint;
}

export interface OfficialSourceRecord {
  id: string;
  url: string;
  name: LocalizedText;
  kind: SourceKind;
  verifiedAsWebsiteEntryPoint: boolean;
  apiVerified: boolean;
  jurisdiction?: string;
  localContext: LocalizedText; // how we describe what we link to
}

export interface ProgramRecord {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  episodeIds: string[];
  heroAssetId: string;
  category: string;
  tagline: LocalizedText;
  worldName: LocalizedText;
  atmosphere: LocalizedText;
  formats: LocalizedText[];
  approach: LocalizedText[];
  statusNote: LocalizedText;
  worldHref: string;
  secondaryAssetId?: string;
  quote?: LocalizedText;
}

export interface LegalOutlineRecord {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  jurisdiction: string;
  status: "outline";
  sourceIds: string[];
  note: LocalizedText;
}

export interface WorldCardRecord {
  id: string;
  href: string;
  assetId: string;
  programSlug?: string;
  kicker: LocalizedText;
  title: LocalizedText;
  teaser: LocalizedText;
  status: PublicationStatus;
  variant: "wide" | "tall" | "editorial";
  category?: string;
}

export interface PageContent {
  eyebrow: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
}

export interface CaptionNote {
  label: LocalizedText;
  prose: LocalizedText;
}

export interface CopyrightLine {
  ar: string;
  en: string;
}
