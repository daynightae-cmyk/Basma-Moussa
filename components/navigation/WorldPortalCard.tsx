import Image from "next/image";
import clsx from "clsx";
import { StatusBadge, type StatusTone } from "@/components/editorial/StatusBadge";
import { ArrowIcon } from "@/components/ui/icons";
import type { FocalPoint } from "@/lib/content/types";
import { PortalLink } from "./PortalLink";

type WorldPortalCardProps = {
  href: string;
  title: string;
  kicker: string;
  teaser: string;
  statusLabel: string;
  statusTone?: StatusTone;
  illustrativeLabel: string;
  ctaLabel: string;
  index: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    focalPoint: FocalPoint;
    blurDataURL: string;
  };
  variant?: "wide" | "tall";
  priority?: boolean;
  className?: string;
};

export function WorldPortalCard({
  href,
  title,
  kicker,
  teaser,
  statusLabel,
  statusTone = "concept",
  illustrativeLabel,
  ctaLabel,
  index,
  image,
  variant = "wide",
  priority = false,
  className,
}: WorldPortalCardProps) {
  return (
    <PortalLink
      href={href}
      title={title}
      className={clsx("portal-card", `portal-card--${variant}`, className)}
    >
      <div className="portal-card__media" data-portal-media>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          priority={priority}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          style={{ objectPosition: `${image.focalPoint.x}% ${image.focalPoint.y}%` }}
        />
      </div>
      <div className="portal-card__shade" />
      <div className="portal-card__rim" />

      <div className="portal-card__top">
        <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
        <span className="portal-card__index" aria-hidden="true">
          {index}
        </span>
      </div>

      <div className="portal-card__body">
        <p className="portal-card__kicker">{kicker}</p>
        <h3 className="portal-card__title">{title}</h3>
        <p className="portal-card__teaser">{teaser}</p>
        <span className="portal-card__cta">
          {ctaLabel}
          <span className="arrow-ring" aria-hidden="true">
            <ArrowIcon />
          </span>
        </span>
        <span className="media-caption">
          <span className="dot" aria-hidden="true" />
          {illustrativeLabel}
        </span>
      </div>
    </PortalLink>
  );
}
