/**
 * ON AIR lifecycle.
 *
 * Honesty contract: LIVE is reachable only when a streaming transport is
 * actually configured *and* that transport acknowledged the connection. No
 * click, timer or optimistic guess can put the interface on air.
 */

export const BROADCAST_PHASES = [
  "IDLE",
  "PREVIEW",
  "PREPARING",
  "CONNECTING",
  "LIVE",
  "RECONNECTING",
  "ENDED",
  "FAILED",
] as const;

export type BroadcastPhase = (typeof BROADCAST_PHASES)[number];

export type BroadcastFailureReason =
  | "transport-not-configured"
  | "producer-not-authorized"
  | "transport-rejected";

export interface BroadcastState {
  phase: BroadcastPhase;
  /** Set by the host environment, never by a button. */
  transportConfigured: boolean;
  /** Set by the host environment (server-verified producer session). */
  producerAuthorized: boolean;
  failure: BroadcastFailureReason | null;
  /** True only after the transport acknowledged a real session. */
  transportAcknowledged: boolean;
}

export type BroadcastEvent =
  | { type: "preview" }
  | { type: "start" }
  | { type: "connect" }
  | { type: "acknowledged" }
  | { type: "reconnecting" }
  | { type: "fail"; reason: BroadcastFailureReason }
  | { type: "stop" }
  | { type: "reset" };

export function initialBroadcastState(
  transportConfigured: boolean,
  producerAuthorized = false,
): BroadcastState {
  return {
    phase: "PREVIEW",
    transportConfigured,
    producerAuthorized,
    failure: null,
    transportAcknowledged: false,
  };
}

export function broadcastReducer(
  state: BroadcastState,
  event: BroadcastEvent,
): BroadcastState {
  switch (event.type) {
    case "preview":
      if (state.phase === "LIVE" || state.phase === "CONNECTING") return state;
      return { ...state, phase: "PREVIEW", failure: null };

    case "start": {
      if (state.phase !== "PREVIEW" && state.phase !== "ENDED" && state.phase !== "FAILED") {
        return state;
      }
      if (!state.transportConfigured) {
        return { ...state, phase: "FAILED", failure: "transport-not-configured" };
      }
      if (!state.producerAuthorized) {
        return { ...state, phase: "FAILED", failure: "producer-not-authorized" };
      }
      return { ...state, phase: "PREPARING", failure: null };
    }

    case "connect":
      if (state.phase !== "PREPARING") return state;
      return { ...state, phase: "CONNECTING" };

    case "acknowledged":
      // The only door to LIVE.
      if (state.phase !== "CONNECTING" && state.phase !== "RECONNECTING") return state;
      if (!state.transportConfigured) return state;
      return { ...state, phase: "LIVE", transportAcknowledged: true, failure: null };

    case "reconnecting":
      if (state.phase !== "LIVE") return state;
      return { ...state, phase: "RECONNECTING", transportAcknowledged: false };

    case "fail":
      return {
        ...state,
        phase: "FAILED",
        transportAcknowledged: false,
        failure: event.reason,
      };

    case "stop":
      if (state.phase === "IDLE") return state;
      return { ...state, phase: "ENDED", transportAcknowledged: false, failure: null };

    case "reset": {
      if (state.phase === "LIVE") return state;
      return { ...state, phase: "PREVIEW", failure: null, transportAcknowledged: false };
    }

    default:
      return state;
  }
}

/** The red lamp is on only for a genuinely live transport. */
export function isOnAir(state: BroadcastState): boolean {
  return state.phase === "LIVE" && state.transportAcknowledged;
}

/** Copy key for the current phase, resolved by the locale dictionary. */
export function broadcastStatusKey(state: BroadcastState): BroadcastPhase {
  return state.phase;
}
