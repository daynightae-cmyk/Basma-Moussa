/**
 * Small synthesized cues for the brand intro.
 *
 * No audio file is shipped and nothing plays unless the visitor explicitly
 * enables sound first: the AudioContext is created on that click, never on
 * mount. If Web Audio is unavailable the call is a silent no-op.
 */

type CueKind = "thread" | "logo" | "enter";

const CUES: Record<CueKind, { freq: number[]; duration: number; gain: number }> = {
  thread: { freq: [523.25], duration: 0.9, gain: 0.05 },
  logo: { freq: [392, 523.25, 659.25], duration: 1.4, gain: 0.045 },
  enter: { freq: [523.25, 783.99], duration: 0.7, gain: 0.05 },
};

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!context) context = new Ctor();
  if (context.state === "suspended") void context.resume();
  return context;
}

export function playCue(kind: CueKind): void {
  const audio = getContext();
  if (!audio) return;
  const cue = CUES[kind];
  const now = audio.currentTime;
  cue.freq.forEach((frequency, index) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    const start = now + index * 0.14;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(cue.gain, start + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + cue.duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + cue.duration + 0.05);
  });
}

export function releaseCueContext(): void {
  if (context) {
    void context.close();
    context = null;
  }
}
