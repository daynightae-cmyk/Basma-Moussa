"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

import { usePortalDoor } from "@/components/navigation/portal-transition-provider";

interface PortalLinkProps {
  href: string;
  doorImage: string;
  doorLabel: string;
  media: React.ReactElement;
  body: React.ReactNode;
  className?: string;
}

export function PortalLink({
  href,
  doorImage,
  doorLabel,
  media,
  body,
  className,
}: PortalLinkProps) {
  const router = useRouter();
  const { openDoor } = usePortalDoor();
  const mediaRef = useRef<HTMLDivElement>(null);
  const isExternal = String(href).startsWith("http");

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isExternal) return;
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        (e.currentTarget as HTMLAnchorElement).target === "_blank"
      ) {
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      e.preventDefault();
      const rect = mediaRef.current?.getBoundingClientRect();
      openDoor({ src: doorImage, label: doorLabel, rect });
      router.push(href as string);
    },
    [href, doorImage, doorLabel, openDoor, router, isExternal]
  );

  return (
    <Link
      href={href}
      className={`portal-card ${className ?? ""}`}
      onClick={handleClick}
    >
      <div ref={mediaRef} className="portal-card__media" data-testid="portal-media">
        {media}
      </div>
      <div className="portal-card__shade" aria-hidden="true" />
      <div className="portal-card__body">{body}</div>
    </Link>
  );
}
