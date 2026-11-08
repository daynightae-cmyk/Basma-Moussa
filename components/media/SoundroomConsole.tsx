"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/lib/i18n/dictionary";

const HEIGHTS = [
  22, 34, 48, 30, 62, 44, 72, 38, 54, 82, 46, 66, 34, 58, 76, 42, 28, 64, 88,
  52, 36, 70, 48, 60, 30, 78, 56, 40, 68, 50, 84, 44, 32, 60, 74, 38, 52, 66,
  42, 28,
];

export function SoundroomConsole({ dict }: { dict: Dictionary }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="wave-console">
      <div className="wave-console__head">
        <span className="wave-console__status">{dict.soundroom.motionLabel}</span>
        <span className="badge badge--unavailable">{dict.common.notAvailable}</span>
      </div>

      <div className={`wave${paused ? " is-paused" : ""}`} aria-hidden="true">
        {HEIGHTS.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="wave__bar"
            style={{
              ["--h" as string]: `${height}%`,
              ["--delay" as string]: `${(index % 12) * -0.18}s`,
            }}
          />
        ))}
        <span className="wave__playhead" />
      </div>

      <div className="wave-console__controls">
        <p className="wave-console__note">{dict.soundroom.motionNote}</p>
        <button
          type="button"
          className="wave-toggle"
          aria-pressed={!paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? dict.soundroom.motionStart : dict.soundroom.motionPause}
        </button>
      </div>
    </div>
  );
}
