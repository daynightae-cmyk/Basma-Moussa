"use client";

import type { Dictionary } from "@/lib/i18n/dictionary";
import {
  isOnAir,
  type BroadcastEvent,
  type BroadcastState,
} from "@/lib/experience/broadcast-machine";

export interface DeviceStatus {
  kind: "unknown" | "found" | "none" | "denied" | "unsupported";
  count?: number;
}

interface DirectorRoomProps {
  dict: Dictionary;
  broadcast: BroadcastState;
  onBroadcast: (event: BroadcastEvent) => void;
  clock: string | null;
  elapsed: string;
  prompter: string;
  notes: string;
  onPrompter: (value: string) => void;
  onNotes: (value: string) => void;
  deviceStatus: DeviceStatus;
  onCheckDevices: () => void;
}

const PHASE_LABELS = {
  IDLE: "statusIdle",
  PREVIEW: "statusPreview",
  PREPARING: "statusPreparing",
  CONNECTING: "statusConnecting",
  LIVE: "statusLive",
  RECONNECTING: "statusReconnecting",
  ENDED: "statusEnded",
  FAILED: "statusFailed",
} as const;

const FAILURE_LABELS = {
  "transport-not-configured": "failureTransport",
  "producer-not-authorized": "failureProducer",
  "transport-rejected": "failureRejected",
} as const;

export function DirectorRoom({
  dict,
  broadcast,
  onBroadcast,
  clock,
  elapsed,
  prompter,
  notes,
  onPrompter,
  onNotes,
  deviceStatus,
  onCheckDevices,
}: DirectorRoomProps) {
  const live = isOnAir(broadcast);
  const canStart =
    broadcast.phase === "PREVIEW" ||
    broadcast.phase === "ENDED" ||
    broadcast.phase === "FAILED";
  const canStop = broadcast.phase !== "IDLE" && broadcast.phase !== "ENDED";

  const deviceLine =
    deviceStatus.kind === "found"
      ? dict.studio.devicesFound.replace("{count}", String(deviceStatus.count ?? 0))
      : deviceStatus.kind === "none"
        ? dict.studio.noDevices
        : deviceStatus.kind === "denied"
          ? dict.studio.deviceCheckDenied
          : dict.studio.micUnknown;

  return (
    <div className="director-room">
      <section
        className="console-panel on-air-panel"
        aria-labelledby="studio-broadcast"
        data-phase={broadcast.phase}
        data-live={live}
      >
        <header className="console-panel__head">
          <h3 id="studio-broadcast">{dict.studio.broadcast}</h3>
          <span className="on-air-panel__status" role="status">
            {dict.studio[PHASE_LABELS[broadcast.phase]]}
          </span>
        </header>

        <div className="on-air">
          <span className="on-air__lamp" aria-hidden="true" />
          <div className="on-air__text">
            <p className="on-air__label">{dict.studio.onAir}</p>
            <p className="on-air__notice">{dict.studio.previewNotice}</p>
          </div>
        </div>

        <div className="broadcast-actions">
          <button
            type="button"
            className="btn btn-gold broadcast-btn"
            onClick={() => onBroadcast({ type: "start" })}
            disabled={!canStart}
          >
            {dict.studio.startBroadcast}
          </button>
          <button
            type="button"
            className="btn btn-ghost broadcast-btn"
            onClick={() => onBroadcast({ type: "stop" })}
            disabled={!canStop}
          >
            {dict.studio.stopSession}
          </button>
        </div>

        <dl className="transport-list">
          <div>
            <dt>{dict.studio.transport}</dt>
            <dd className="transport-list__bad">{dict.common.notAvailable}</dd>
          </div>
          <div>
            <dt>{dict.studio.micStatus}</dt>
            <dd>
              <button type="button" className="console-link" onClick={onCheckDevices}>
                {dict.studio.deviceCheck}
              </button>
              <span className="transport-list__device">{deviceLine}</span>
            </dd>
          </div>
        </dl>

        {broadcast.phase === "FAILED" && broadcast.failure && (
          <p className="broadcast-failure" role="alert">
            {dict.studio[FAILURE_LABELS[broadcast.failure]]}
          </p>
        )}
        {broadcast.phase === "ENDED" && (
          <p className="console-note" role="status">
            {dict.studio.ended}
          </p>
        )}
        <p className="console-note">{dict.studio.transportMissing}</p>
      </section>

      <section className="console-panel session-panel" aria-labelledby="studio-session">
        <header className="console-panel__head">
          <h3 id="studio-session">{dict.studio.directorRoom}</h3>
          <span className="session-panel__clock">
            {clock ?? "--:--"}
          </span>
        </header>

        <div className="session-panel__timer">
          <span className="session-panel__timer-label">{dict.studio.sessionTimer}</span>
          <span className="session-panel__timer-value">{elapsed}</span>
        </div>

        <label className="field">
          <span className="field__label">{dict.studio.teleprompter}</span>
          <textarea
            className="field__input"
            rows={3}
            value={prompter}
            placeholder={dict.studio.teleprompterPlaceholder}
            onChange={(event) => onPrompter(event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">{dict.studio.directorNotes}</span>
          <textarea
            className="field__input"
            rows={3}
            value={notes}
            placeholder={dict.studio.notesPlaceholder}
            onChange={(event) => onNotes(event.target.value)}
          />
        </label>
      </section>
    </div>
  );
}
