import Image from "next/image";
import clsx from "clsx";
import { StatusBadge } from "./StatusBadge";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import type { MediaAsset } from "@/lib/content/types";

type MediaFigureProps = {
  asset: MediaAsset;
  locale: Locale;
  caption?: string;
  variant?: "wide" | "portrait" | "square";
  priority?: boolean;
  showBadge?: boolean;
  className?: string;
  sizes?: string;
};

export function MediaFigure({
  asset,
  locale,
  caption,
  variant = "wide",
  priority = false,
  showBadge = true,
  className,
  sizes,
}: MediaFigureProps) {
  const dict = getDictionary(locale);

  return (
    <figure className={clsx("media-figure", className)}>
      <div className={clsx("media-frame", `media-frame--${variant}`)}>
        <Image
          src={asset.src}
          alt={asset.alt[locale]}
          fill
          sizes={
            sizes ??
            (variant === "portrait"
              ? "(max-width: 900px) 100vw, 45vw"
              : "(max-width: 900px) 100vw, 60vw")
          }
          priority={priority}
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          style={{
            objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%`,
          }}
        />
      </div>
      {caption || showBadge ? (
        <figcaption className="media-caption media-figure__caption">
          {showBadge ? (
            <StatusBadge tone="illustrative">{dict.common.illustrative}</StatusBadge>
          ) : null}
          {caption ? <span>{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
