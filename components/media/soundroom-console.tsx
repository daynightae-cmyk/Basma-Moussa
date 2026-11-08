"use client";

import { useCallback, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionary";

interface SoundroomConsoleProps {
  dict: Dictionary;
}

export function SoundroomConsole({ dict }: SoundroomConsoleProps) {
  const [moving, setMoving] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toggle = useCallback(() => {
    setMoving((prev) => !prev);
  }, []);

  return (
    <div className="soundroom-console">
      <div className="soundroom-console__wave">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className={`bar bar-${i} ${moving && !reduced ? "moving" : ""}`} />
        ))}
      </div>
      <button
        className="btn btn-text soundroom-console__toggle"
        aria-pressed={moving}
        onClick={toggle}
        title={moving ? dict.soundroom.motionPause : dict.soundroom.motionStart}
      >
        {moving ? dict.soundroom.motionPause : dict.soundroom.motionStart}
      </button>
      <p className="soundroom-console__note">{dict.soundroom.motionNote}</p>
    </div>
  );
}
