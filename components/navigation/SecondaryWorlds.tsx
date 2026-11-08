import Image from "next/image";
import { getAsset } from "@/lib/content/assets";
import type { SecondaryWorldCard } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { ArrowIcon } from "@/components/ui/icons";
import { PortalLink } from "./PortalLink";

export function SecondaryWorlds({
  locale,
  worlds,
}: {
  locale: Locale;
  worlds: SecondaryWorldCard[];
}) {
  return (
    <div className="world-strip">
      {worlds.map((world) => {
        const asset = getAsset(world.assetId);
        const title = world.title[locale];
        return (
          <PortalLink
            key={world.id}
            href={localizedPath(locale, world.href)}
            title={title}
            className="world-card"
          >
            <div className="world-card__media" data-portal-media>
              <Image
                src={asset.src}
                alt={asset.alt[locale]}
                fill
                sizes="(max-width: 900px) 50vw, 24vw"
                style={{
                  objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%`,
                }}
              />
            </div>
            <p className="world-card__kicker">{world.kicker[locale]}</p>
            <h3>{title}</h3>
            <p>{world.teaser[locale]}</p>
            <span className="world-card__cta">
              {locale === "ar" ? "افتح المسار" : "Open the path"}
              <ArrowIcon className="world-card__arrow" />
            </span>
          </PortalLink>
        );
      })}
    </div>
  );
}
