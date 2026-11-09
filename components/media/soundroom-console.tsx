"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionary";

interface SoundroomConsoleProps {
  dict: Dictionary;
}

type MicStatus = "idle" | "requesting" | "active" | "denied" | "unsupported" | "error";

/**
 * Soundroom desk.
 *
 * The level meters are driven by the visitor's real microphone through the Web
 * Audio API — there is no simulated input. Without permission the console says
 * so and stays silent. The decorative ribbon remains a separate, labelled
 * visual toggle (it is not audio).
 */
export function SoundroomConsole({ dict }: SoundroomConsoleProps) {
  const [moving, setMoving] = useState(false);
  const [status, setStatus] = useState<MicStatus>("idle");
  const [level, setLevel] = useState(0);
  const [peak, setPeak] = useState(0);
  const [muted, setMuted] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");

  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastPaintRef = useRef(0);

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
    setLevel(0);
    setPeak(0);
    setMuted(false);
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  const metering = useCallback((stream: MediaStream, context: AudioContext) => {
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.7;
    source.connect(analyser);
    const buffer = new Uint8Array(analyser.fftSize);

    const tick = (time: number) => {
      analyser.getByteTimeDomainData(buffer);
      let sum = 0;
      for (let index = 0; index < buffer.length; index += 1) {
        const sample = (buffer[index] - 128) / 128;
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / buffer.length);
      const value = Math.min(1, rms * 3.4);
      // ~20fps is enough for a readable meter and keeps React quiet.
      if (time - lastPaintRef.current > 45) {
        lastPaintRef.current = time;
        setLevel(value);
        setPeak((previous) => Math.max(value, previous * 0.94));
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(
    async (nextDeviceId?: string) => {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setStatus("unsupported");
        return;
      }
      teardown();
      setStatus("requesting");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: nextDeviceId
            ? { deviceId: { exact: nextDeviceId }, echoCancellation: true, noiseSuppression: true }
            : { echoCancellation: true, noiseSuppression: true },
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
        metering(stream, context);
        setStatus("active");
        try {
          const list = await navigator.mediaDevices.enumerateDevices();
          const inputs = list.filter((device) => device.kind === "audioinput");
          setDevices(inputs);
          const track = stream.getAudioTracks()[0];
          const activeId = track?.getSettings().deviceId ?? inputs[0]?.deviceId ?? "";
          setDeviceId(activeId);
        } catch {
          setDevices([]);
        }
      } catch (error) {
        const name = error instanceof DOMException ? error.name : "";
        setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "error");
      }
    },
    [metering, teardown],
  );

  const stop = useCallback(() => {
    teardown();
    setStatus("idle");
  }, [teardown]);

  const toggleMute = useCallback(() => {
    const stream = streamRef.current;
    if (!stream) return;
    const next = !muted;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !next;
    });
    setMuted(next);
  }, [muted]);

  const toggleMotion = useCallback(() => setMoving((previous) => !previous), []);

  const statusLine =
    status === "active"
      ? dict.soundroom.micActive.replace(
          "{device}",
          devices.find((device) => device.deviceId === deviceId)?.label || dict.soundroom.micDevice,
        )
      : status === "requesting"
        ? dict.soundroom.micRequesting
        : status === "denied"
          ? dict.soundroom.micDenied
          : status === "unsupported"
            ? dict.soundroom.micUnsupported
            : status === "error"
              ? dict.soundroom.micError
              : dict.soundroom.micIdle;

  const percentage = Math.round(level * 100);
  const peakPercentage = Math.round(peak * 100);

  return (
    <div className="soundroom-console">
      <div className="soundroom-console__wave" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div key={index} className={`bar bar-${index} ${moving ? "moving" : ""}`} />
        ))}
      </div>
      <button
        className="btn btn-text soundroom-console__toggle"
        aria-pressed={moving}
        onClick={toggleMotion}
        title={moving ? dict.soundroom.motionPause : dict.soundroom.motionStart}
      >
        {moving ? dict.soundroom.motionPause : dict.soundroom.motionStart}
      </button>
      <p className="soundroom-console__note">{dict.soundroom.motionNote}</p>

      <section className="mic-desk" aria-labelledby="mic-desk-title">
        <header className="mic-desk__head">
          <h3 id="mic-desk-title">{dict.soundroom.micTitle}</h3>
          <span
            className="mic-desk__status"
            data-status={status}
            role="status"
            aria-live="polite"
          >
            {statusLine}
          </span>
        </header>

        <div className="mic-desk__actions">
          {status === "active" ? (
            <>
              <button
                type="button"
                className="btn btn-ghost mic-btn"
                onClick={toggleMute}
                aria-pressed={muted}
              >
                {muted ? dict.soundroom.micUnmute : dict.soundroom.micMute}
              </button>
              <button type="button" className="btn btn-ghost mic-btn" onClick={stop}>
                {dict.soundroom.micStop}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-gold mic-btn"
              onClick={() => void start()}
              disabled={status === "requesting"}
            >
              {status === "requesting" ? dict.soundroom.micRequesting : dict.soundroom.micEnable}
            </button>
          )}
        </div>

        {status === "active" && devices.length > 1 && (
          <label className="mic-device">
            <span>{dict.soundroom.micDevice}</span>
            <select
              value={deviceId}
              onChange={(event) => {
                const next = event.target.value;
                setDeviceId(next);
                void start(next);
              }}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || dict.soundroom.micDevice}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="mic-channels">
          <div className="mic-channel" data-live={status === "active" && !muted}>
            <div className="mic-channel__head">
              <span>{dict.soundroom.channelHost}</span>
              <span className="mic-channel__peak">
                {dict.soundroom.peakLabel} {peakPercentage}%
              </span>
            </div>
            <div
              className="mic-meter"
              role="meter"
              aria-label={dict.soundroom.levelLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percentage}
            >
              <span className="mic-meter__fill" style={{ width: `${percentage}%` }} />
              <span className="mic-meter__peak" style={{ insetInlineStart: `${peakPercentage}%` }} />
            </div>
          </div>

          <div className="mic-channel mic-channel--guest">
            <div className="mic-channel__head">
              <span>{dict.soundroom.channelGuest}</span>
            </div>
            <p className="mic-channel__empty">{dict.soundroom.channelGuestEmpty}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
