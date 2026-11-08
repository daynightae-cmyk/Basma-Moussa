"use client";

import { useRouter } from "next/navigation";

import type { Dictionary } from "@/lib/i18n/dictionary";

/**
 * Replay Intro — re-shows the BrandThreadSplash on demand.
 *
 * Clicking clears the first-session flag and reloads the page with
 * ?replay=1, which the splash already honors (it removes the param itself
 * once the intro is shown). Renders identical HTML on server and client so
 * there is no hydration mismatch.
 */
export function ReplayIntroButton({ dict }: { dict: Dictionary }) {
  const router = useRouter();

  const handleClick = () => {
    try {
      sessionStorage.removeItem("bm-splash-seen");
    } catch {
      // sessionStorage unavailable: the URL param alone still re-shows it.
    }
    router.replace(`${window.location.pathname}?replay=1`);
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
