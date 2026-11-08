"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type MouseEvent, type ReactNode } from "react";
import { usePortalTransition } from "./PortalTransition";

type PortalLinkProps = {
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/**
 * A real anchor that opens a cinematic door when motion is allowed.
 * Modified clicks, reduced-motion users and no-JS visitors keep normal
 * browser navigation.
 */
export function PortalLink({
  href,
  title,
  className,
  children,
  "aria-label": ariaLabel,
}: PortalLinkProps) {
  const router = useRouter();
  const { openDoor } = usePortalTransition();

  const onClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (
        typeof window === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const anchor = event.currentTarget;
      const media =
        anchor.querySelector<HTMLElement>("[data-portal-media]") ?? anchor;
      const image = anchor.querySelector<HTMLImageElement>("img");
      const imageSrc = image?.currentSrc || image?.src || "";
      if (!imageSrc) return;

      const rect = media.getBoundingClientRect();
      event.preventDefault();
      openDoor({
        href,
        title,
        imageSrc,
        top: Math.max(0, rect.top),
        left: Math.max(0, rect.left),
        right: Math.max(0, window.innerWidth - rect.right),
        bottom: Math.max(0, window.innerHeight - rect.bottom),
      });
      router.push(href);
    },
    [href, openDoor, router, title],
  );

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      data-portal-link
    >
      {children}
    </Link>
  );
}
