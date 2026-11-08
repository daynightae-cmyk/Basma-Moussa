"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type DoorState = "idle" | "sealed" | "opening" | "open";

interface DoorOpts {
  src: string;
  label: string;
  rect?: { top: number; right: number; bottom: number; left: number };
}

interface PortalDoorContextValue {
  openDoor: (opts: DoorOpts) => void;
  closeDoor: () => void;
  state: DoorState;
  image: string;
  label: string;
  rect: DoorOpts["rect"] | null;
}

const Ctx = createContext<PortalDoorContextValue | null>(null);

export function PortalTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<DoorState>("idle");
  const [image, setImage] = useState("");
  const [label, setLabel] = useState("");
  const [rect, setRect] = useState<DoorOpts["rect"] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const closeDoor = useCallback(() => {
    clearTimers();
    setState("idle");
    setImage("");
    setLabel("");
    setRect(null);
  }, [clearTimers]);

  const openDoor = useCallback(
    (opts: DoorOpts) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      clearTimers();
      setRect(opts.rect ?? null);
      setImage(opts.src);
      setLabel(opts.label);
      setState("sealed");
      timer.current = setTimeout(() => setState("opening"), 30);
      timer.current = setTimeout(() => setState("open"), 980);
      timer.current = setTimeout(closeDoor, 1400);
    },
    [clearTimers, closeDoor]
  );

  return (
    <Ctx.Provider value={{ openDoor, closeDoor, state, image, label, rect }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePortalDoor(): PortalDoorContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("usePortalDoor must be used inside PortalTransitionProvider");
  }
  return ctx;
}
