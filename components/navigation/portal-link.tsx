"use client";

import Link from "next/link";
import clsx from "clsx";
import { useCallback, useRef } from "react";

import { usePortalDoor } from "@/components/navigation/portal-transition-provider";

interface PortalLinkProps {
  href: string;
  doorImage: string;
  doorLabel: string;
  media: React.ReactElement;
  body: React.ReactNode;
  className?: string;
  mediaTestId?: string;
}

export function PortalLink({
  href,
  doorImage,
  doorLabel,
  media,
  body,
  className,
  mediaTestId = "portal-media",
}: PortalLinkProps) {
  const { openDoor } = usePortalDoor();
  const mediaRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        e.defaultPrevented || !href.startsWith("/") || href.startsWith("//") ||
        e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
        e.currentTarget.target === "_blank"
      ) return;
      const rect = mediaRef.current?.getBoundingClientRect();
      const image = mediaRef.current?.querySelector("img");
      openDoor({
        href,
        src: doorImage,
        label: doorLabel,
        rect: rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height } : undefined,
        objectPosition: image ? getComputedStyle(image).objectPosition : "50% 50%",
        trigger: e.currentTarget,
      });
      // Let Next Link handle navigation, prefetching and browser history normally.
    },
    [href, doorImage, doorLabel, openDoor]
  );

  return (
    <Link
      href={href}
      className={clsx("portal-card", className)}
      onClick={handleClick}
    >
      <div ref={mediaRef} className="portal-card__media" data-testid={mediaTestId}>
        {media}
      </div>
      <div className="portal-card__shade" aria-hidden="true" />
      <div className="portal-card__rim" aria-hidden="true" />
      <div className="portal-card__body">{body}</div>
    </Link>
  );
}
