import { describe, expect, it } from "vitest";

import {
  broadcastReducer,
  initialBroadcastState,
  isOnAir,
  type BroadcastState,
} from "@/lib/experience/broadcast-machine";

function configured(): BroadcastState {
  return initialBroadcastState(true, true);
}

describe("ON AIR honesty", () => {
  it("never goes live without a configured transport", () => {
    const state = initialBroadcastState(false, true);
    const failed = broadcastReducer(state, { type: "start" });
    expect(failed.phase).toBe("FAILED");
    expect(failed.failure).toBe("transport-not-configured");
    expect(isOnAir(failed)).toBe(false);
    // No event can rescue it into LIVE without the transport.
    expect(broadcastReducer(failed, { type: "acknowledged" }).phase).toBe("FAILED");
  });

  it("refuses a producer without authorisation", () => {
    const state = initialBroadcastState(true, false);
    const failed = broadcastReducer(state, { type: "start" });
    expect(failed.phase).toBe("FAILED");
    expect(failed.failure).toBe("producer-not-authorized");
  });

  it("reaches LIVE only after the transport acknowledges", () => {
    const preparing = broadcastReducer(configured(), { type: "start" });
    expect(preparing.phase).toBe("PREPARING");
    expect(isOnAir(preparing)).toBe(false);

    const connecting = broadcastReducer(preparing, { type: "connect" });
    expect(connecting.phase).toBe("CONNECTING");
    expect(isOnAir(connecting)).toBe(false);

    const live = broadcastReducer(connecting, { type: "acknowledged" });
    expect(live.phase).toBe("LIVE");
    expect(isOnAir(live)).toBe(true);
  });

  it("ignores an acknowledgement outside the connecting window", () => {
    const preparing = broadcastReducer(configured(), { type: "start" });
    expect(broadcastReducer(preparing, { type: "acknowledged" }).phase).toBe("PREPARING");
  });

  it("drops off air on failure or reconnect and needs a new acknowledgement", () => {
    const live = broadcastReducer(
      broadcastReducer(configured(), { type: "start" }),
      { type: "connect" },
    );
    const onAir = broadcastReducer(live, { type: "acknowledged" });
    const reconnecting = broadcastReducer(onAir, { type: "reconnecting" });
    expect(reconnecting.phase).toBe("RECONNECTING");
    expect(isOnAir(reconnecting)).toBe(false);
    expect(broadcastReducer(reconnecting, { type: "fail", reason: "transport-rejected" }).phase).toBe(
      "FAILED",
    );
  });

  it("ends a session back into preview without claiming a broadcast", () => {
    const ended = broadcastReducer(configured(), { type: "stop" });
    expect(ended.phase).toBe("ENDED");
    const reset = broadcastReducer(ended, { type: "reset" });
    expect(reset.phase).toBe("PREVIEW");
    expect(isOnAir(reset)).toBe(false);
  });
});
