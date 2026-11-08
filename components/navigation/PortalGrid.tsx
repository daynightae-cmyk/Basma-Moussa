import clsx from "clsx";
import { getAsset } from "@/lib/content/assets";
import type { MediaWorldEntry } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/dictionary";
import { WorldPortalCard } from "./WorldPortalCard";

type PortalGridProps = {
  locale: Locale;
  worlds: MediaWorldEntry[];
  className?: string;
  startIndex?: number;
  prioritizeFirst?: boolean;
};

export function PortalGrid({
  locale,
  worlds,
  className,
  startIndex = 0,
  prioritizeFirst = false,
}: PortalGridProps) {
  const dict = getDictionary(locale);

  return (
    <div className={clsx("portal-grid", className)}>
      {worlds.map((world, index) => {
        const asset = getAsset(world.assetId);
        return (
          <WorldPortalCard
            key={world.id}
            href={localizedPath(locale, world.href)}
            title={world.title[locale]}
            kicker={world.kicker[locale]}
            teaser={world.teaser[locale]}
            statusLabel={dict.status.concept}
            statusTone="concept"
            illustrativeLabel={dict.common.illustrativeShort}
            ctaLabel={dict.common.enterWorld}
            index={String(startIndex + index + 1).padStart(2, "0")}
            image={{
              src: asset.src,
              alt: asset.alt[locale],
              width: asset.width,
              height: asset.height,
              focalPoint: asset.focalPoint,
              blurDataURL: asset.blurDataURL,
            }}
            variant={world.variant}
            priority={prioritizeFirst && index === 0}
          />
        );
      })}
    </div>
  );
}
