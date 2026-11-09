"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type MicStatus = "idle" | "requesting" | "active" | "denied" | "unsupported" | "error";

interface SonicSculptureCopy {
  enable: string;
  stop: string;
  requesting: string;
  denied: string;
  unsupported: string;
  error: string;
  idle: string;
  live: string;
  meterLabel: string;
  low: string;
  mid: string;
  high: string;
  privacy: string;
}

interface SonicSculptureProps {
  locale: "ar" | "en";
  copy: SonicSculptureCopy;
}

const RINGS = [
  { band: "low" as const, count: 14, size: 0.92 },
  { band: "mid" as const, count: 10, size: 0.62 },
  { band: "high" as const, count: 7, size: 0.36 },
];

/**
 * The Sonic Sculpture Studio.
 *
 * A CSS-3D rosette whose blades are scaled by three live frequency bands taken
 * from the visitor's own microphone through the Web Audio API. Nothing is
 * recorded, buffered to disk or sent anywhere: the analyser reads the stream in
 * the page and the loop writes three CSS variables. Without permission the
 * sculpture simply rests and says so.
 */
export function SonicSculpture({ locale, copy }: SonicSculptureProps) {
  const ar = locale === "ar";
  const [status, setStatus] = useState<MicStatus>("idle");
  const [level, setLevel] = useState(0);
  const [bands, setBands] = useState({ low: 0, mid: 0, high: 0 });

  const stageRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const smoothRef = useRef({ low: 0, mid: 0, high: 0, level: 0 });
  const paintRef = useRef(0);

  const rest = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    ["--low", "--mid", "--high", "--level"].forEach((property) => {
      stage.style.setProperty(property, "0");
    });
  }, []);

  const teardown = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (contextRef.current) {
      void contextRef.current.close();
      contextRef.current = null;
    }
    smoothRef.current = { low: 0, mid: 0, high: 0, level: 0 };
    setLevel(0);
    setBands({ low: 0, mid: 0, high: 0 });
    rest();
  }, [rest]);

  useEffect(() => () => teardown(), [teardown]);

  const sculpture = useCallback((stream: MediaStream, context: AudioContext) => {
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);

    const frequency = new Uint8Array(analyser.frequencyBinCount);
    const band = (from: number, to: number) => {
      let sum = 0;
      const end = Math.min(to, frequency.length);
      for (let index = from; index < end; index += 1) sum += frequency[index];
      return Math.min(1, sum / Math.max(1, end - from) / 210);
    };

    const tick = (time: number) => {
      analyser.getByteFrequencyData(frequency);
      const smooth = smoothRef.current;
      // 1.6%–400Hz, 400Hz–2.6kHz, 2.6kHz–9kHz at a 48kHz sample rate.
      smooth.low += (band(1, 8) - smooth.low) * 0.22;
      smooth.mid += (band(9, 55) - smooth.mid) * 0.26;
      smooth.high += (band(56, 190) - smooth.high) * 0.32;
      const energy = (smooth.low * 0.5 + smooth.mid * 0.32 + smooth.high * 0.18) * 1.5;
      smooth.level += (Math.min(1, energy) - smooth.level) * 0.3;

      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--low", smooth.low.toFixed(3));
        stage.style.setProperty("--mid", smooth.mid.toFixed(3));
        stage.style.setProperty("--high", smooth.high.toFixed(3));
        stage.style.setProperty("--level", smooth.level.toFixed(3));
      }

      // The readout is text, not motion: ~8fps keeps React quiet.
      if (time - paintRef.current > 120) {
        paintRef.current = time;
        setLevel(smooth.level);
        setBands({ low: smooth.low, mid: smooth.mid, high: smooth.high });
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    teardown();
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) {
        setStatus("unsupported");
        return;
      }
      const context = new Ctor();
      contextRef.current = context;
      await context.resume().catch(() => undefined);
      sculpture(stream, context);
      setStatus("active");
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "error");
    }
  }, [sculpture, teardown]);

  const stop = useCallback(() => {
    teardown();
    setStatus("idle");
  }, [teardown]);

  const statusLine =
    status === "active"
      ? copy.live
      : status === "requesting"
        ? copy.requesting
        : status === "denied"
          ? copy.denied
          : status === "unsupported"
            ? copy.unsupported
            : status === "error"
              ? copy.error
              : copy.idle;

  const percentage = Math.round(level * 100);
  const bandRows: Array<{ key: "low" | "mid" | "high"; label: string }> = [
    { key: "low", label: copy.low },
    { key: "mid", label: copy.mid },
    { key: "high", label: copy.high },
  ];

  return (
    <div className="sculpture" data-status={status}>
      <div
        className="sculpture__stage"
        ref={stageRef}
        data-testid="sonic-sculpture"
        role="img"
        aria-label={ar ? "نحت زجاجي ثلاثي الأبعاد يتفاعل مع الصوت" : "a glass 3D sculpture reacting to sound"}
      >
        <span className="sculpture__halo" aria-hidden="true" />
        <div className="sculpture__field" aria-hidden="true">
          {RINGS.map((ring) => (
            <div
              key={ring.band}
              className="sculpture__ring"
              data-band={ring.band}
              style={{ "--ring-size": ring.size } as CSSProperties}
            >
              {Array.from({ length: ring.count }).map((_, blade) => (
                <span
                  key={blade}
                  className="sculpture__blade"
                  style={{ "--angle": `${(360 / ring.count) * blade}deg` } as CSSProperties}
                />
              ))}
            </div>
          ))}
          <span className="sculpture__core" />
          <span className="sculpture__disc" />
        </div>
      </div>

      <div className="sculpture__rail">
        <div className="sculpture__controls">
          {status === "active" ? (
            <button type="button" className="btn btn-ghost mic-btn" onClick={stop}>
              {copy.stop}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-gold mic-btn"
              onClick={() => void start()}
              disabled={status === "requesting"}
            >
              {status === "requesting" ? copy.requesting : copy.enable}
            </button>
          )}
          <span className="sculpture__status" role="status" aria-live="polite">
            {statusLine}
          </span>
        </div>

        <div
          className="sculpture__meter"
          role="meter"
          aria-label={copy.meterLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <span className="sculpture__meter-fill" style={{ width: `${percentage}%` }} />
        </div>

        <dl className="sculpture__bands">
          {bandRows.map((row) => (
            <div key={row.key} className="sculpture__band" data-band={row.key}>
              <dt>{row.label}</dt>
              <dd>
                <span className="sculpture__band-track">
                  <span
                    className="sculpture__band-fill"
                    style={{ width: `${Math.round(bands[row.key] * 100)}%` }}
                  />
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="sculpture__privacy">{copy.privacy}</p>
      </div>
    </div>
  );
}
