"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type DoorConfig = {
  href: string;
  title: string;
  imageSrc: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type PortalTransitionContextValue = {
  openDoor: (config: DoorConfig) => void;
};

const PortalTransitionContext =
  createContext<PortalTransitionContextValue | null>(null);

export function usePortalTransition(): PortalTransitionContextValue {
  const context = useContext(PortalTransitionContext);
  if (!context) {
    throw new Error("usePortalTransition must be used inside PortalTransitionProvider");
  }
  return context;
}

export function PortalTransitionProvider({ children }: { children: ReactNode }) {
  const [door, setDoor] = useState<DoorConfig | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, []);

  const openDoor = useCallback(
    (config: DoorConfig) => {
      clearTimer();
      setDoor(config);
      timeout.current = setTimeout(() => setDoor(null), 1500);
    },
    [clearTimer],
  );

  useEffect(() => {
    if (!door) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDoor(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [door]);

  useEffect(() => clearTimer, [clearTimer]);

  const style = door
    ? ({
        "--door-top": `${door.top}px`,
        "--door-right": `${door.right}px`,
        "--door-bottom": `${door.bottom}px`,
        "--door-left": `${door.left}px`,
      } as CSSProperties)
    : undefined;

  return (
    <PortalTransitionContext.Provider value={{ openDoor }}>
      {children}
      {door ? (
        <div
          className="door door--active"
          aria-hidden="true"
          style={style}
          onClick={() => setDoor(null)}
        >
          <div className="door__frame">
            <div className="door__panel door__panel--a">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={door.imageSrc} alt="" aria-hidden="true" />
            </div>
            <div className="door__panel door__panel--b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={door.imageSrc} alt="" aria-hidden="true" />
            </div>
            <div className="door__shade" />
            <div className="door__seam" />
            <div className="door__label">{door.title}</div>
          </div>
        </div>
      ) : null}
    </PortalTransitionContext.Provider>
  );
}
