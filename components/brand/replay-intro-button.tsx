"use client";

import type { Dictionary } from "@/lib/i18n/dictionary";
import { SPLASH_REPLAY_EVENT, SPLASH_STORAGE_KEY } from "@/lib/experience/splash-sequence";

/**
 * Replay Intro — re-shows the brand intro on demand.
 *
 * The splash is already mounted on the page, so a custom event re-opens it in
 * place. No reload, and the reduced-motion preference is respected by the
 * splash itself. Renders identical HTML on server and client.
 */
export function ReplayIntroButton({ dict }: { dict: Dictionary }) {
  const handleClick = () => {
    try {
      sessionStorage.removeItem(SPLASH_STORAGE_KEY);
    } catch {
      // Storage disabled: the in-page event still re-opens the intro.
    }
    window.dispatchEvent(new Event(SPLASH_REPLAY_EVENT));
  };

  return (
    <button
      className="replay-intro"
      onClick={handleClick}
      aria-label={dict.common.replayIntro}
      title={dict.common.replayIntro}
    >
      {dict.common.replayIntro}
    </button>
  );
}
