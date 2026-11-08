"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
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
      timers.current.push(setTimeout(() => setState("opening"), 30));
      timers.current.push(setTimeout(() => setState("open"), 980));
      timers.current.push(setTimeout(closeDoor, 1400));
    },
    [clearTimers, closeDoor],
  );

  // Cleanup on unmount / route teardown so orphaned timers cannot leak.
  useEffect(() => () => clearTimers(), [clearTimers]);

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
