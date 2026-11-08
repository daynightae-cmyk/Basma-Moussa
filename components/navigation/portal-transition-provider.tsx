"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useReducer, useRef, type ReactNode } from "react";
import { resolveMotionPolicy } from "@/lib/motion/policy";
import {
  initialPortalMachine,
  isPortalActive,
  portalReducer,
  type PortalEvent,
  type PortalMachine,
  type PortalRequest,
} from "@/lib/experience/portal-machine";

interface DoorOpts {
  href: string;
  src: string;
  label: string;
  objectPosition: string;
  rect?: PortalRequest["rect"];
  trigger: HTMLAnchorElement;
}

interface PortalDoorContextValue {
  machine: PortalMachine;
  openDoor: (opts: DoorOpts) => void;
  closeDoor: () => void;
  advance: (event: PortalEvent) => void;
}

const Ctx = createContext<PortalDoorContextValue | null>(null);

export function PortalTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [machine, dispatch] = useReducer(portalReducer, initialPortalMachine);
  const sequence = useRef(0);
  const originHeading = useRef<Element | null>(null);
  const originTrigger = useRef<HTMLAnchorElement | null>(null);
  const destinationHeading = useRef<HTMLElement | null>(null);
  const { id, phase, request, ready } = machine;
  const active = isPortalActive(phase);

  const openDoor = useCallback((opts: DoorOpts) => {
    const policy = resolveMotionPolicy({
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      hardwareConcurrency: navigator.hardwareConcurrency,
      saveData: (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      viewportWidth: window.innerWidth,
    });
    const target = new URL(opts.href, window.location.href);
    if (!policy.cinematic || target.pathname === pathname) return;
    originHeading.current = document.querySelector("#main h1, #main h2");
    originTrigger.current = opts.trigger;
    destinationHeading.current = null;
    dispatch({
      type: "start",
      id: ++sequence.current,
      request: {
        href: target.pathname,
        sourcePath: pathname,
        src: opts.src,
        label: opts.label,
        objectPosition: opts.objectPosition,
        lowPower: policy.lowPower,
        rect: opts.rect,
      },
    });
  }, [pathname]);

  const closeDoor = useCallback(() => dispatch({ type: "cancel", id }), [id]);

  // A timeout only releases the decoration; it never asserts successful arrival.
  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(() => dispatch({ type: "timeout", id }), 6500);
    const interrupt = () => dispatch({ type: "cancel", id });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") interrupt();
    };
    const onVisibility = () => {
      if (document.hidden) interrupt();
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (reduced.matches) interrupt();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", interrupt);
    window.addEventListener("resize", interrupt);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotion);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", interrupt);
      window.removeEventListener("resize", interrupt);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotion);
    };
  }, [active, id]);

  useEffect(() => {
    if (!active || !request) return;
    if (pathname !== request.href) {
      if (pathname !== request.sourcePath) dispatch({ type: "cancel", id });
      return;
    }
    if (ready) return;
    const main = document.getElementById("main");
    if (!main) return;
    // URL commit alone can precede streamed content. Wait for a new real heading.
    const inspect = () => {
      const heading = main.querySelector<HTMLElement>("h1, h2");
      if (!heading || heading === originHeading.current || !heading.textContent?.trim()) return;
      destinationHeading.current = heading;
      dispatch({ type: "ready", id });
    };
    const observer = new MutationObserver(inspect);
    observer.observe(main, { childList: true, subtree: true, characterData: true });
    inspect();
    return () => observer.disconnect();
  }, [pathname, active, request, ready, id]);

  useEffect(() => {
    if (phase !== "arriving") return;
    const heading = destinationHeading.current;
    if (!heading?.isConnected) return;
    const focused = document.activeElement;
    if (focused === document.body || focused === originTrigger.current || focused?.hasAttribute("data-portal-skip")) {
      const hadTabIndex = heading.hasAttribute("tabindex");
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      const restore = () => {
        if (!hadTabIndex) heading.removeAttribute("tabindex");
      };
      heading.addEventListener("blur", restore, { once: true });
      return () => {
        heading.removeEventListener("blur", restore);
        restore();
      };
    }
  }, [phase]);

  // Transfer focus after the decorative overlay actually unmounts.
  // The arriving phase may run while the portal button is still focused.
  useEffect(() => {
    if (phase !== "complete") return;
    const heading = destinationHeading.current;
    if (!heading?.isConnected) return;
    const frame = window.requestAnimationFrame(() => {
      if (!heading.isConnected) return;
      const focused = document.activeElement;
      const hasIntentionalDestinationFocus =
        focused !== document.body &&
        focused?.isConnected &&
        focused !== originTrigger.current &&
        !focused?.hasAttribute("data-portal-skip");
      if (hasIntentionalDestinationFocus) return;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  return (
    <Ctx.Provider value={{ machine, openDoor, closeDoor, advance: dispatch }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePortalDoor(): PortalDoorContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePortalDoor must be used inside PortalTransitionProvider");
  return ctx;
}
