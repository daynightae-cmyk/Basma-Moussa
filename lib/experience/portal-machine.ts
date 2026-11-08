export type PortalPhase =
  | "idle"
  | "preparing"
  | "expanding"
  | "waiting"
  | "opening"
  | "arriving"
  | "complete"
  | "cancelled"
  | "timed-out";

export interface PortalRequest {
  href: string;
  sourcePath: string;
  src: string;
  label: string;
  objectPosition: string;
  lowPower: boolean;
  rect?: { top: number; left: number; width: number; height: number };
}

export interface PortalMachine {
  id: number;
  phase: PortalPhase;
  ready: boolean;
  request: PortalRequest | null;
}

export type PortalEvent =
  | { type: "start"; id: number; request: PortalRequest }
  | { type: "prepared" | "expanded" | "ready" | "opened" | "finished" | "cancel" | "timeout"; id: number };

export const initialPortalMachine: PortalMachine = {
  id: 0,
  phase: "idle",
  ready: false,
  request: null,
};

export function isPortalActive(phase: PortalPhase): boolean {
  return ["preparing", "expanding", "waiting", "opening", "arriving"].includes(phase);
}

export function portalReducer(state: PortalMachine, event: PortalEvent): PortalMachine {
  if (event.type === "start") {
    return { id: event.id, phase: "preparing", ready: false, request: event.request };
  }
  if (event.id !== state.id) return state;
  if (event.type === "cancel" && state.phase === "timed-out") return { ...state, phase: "cancelled" };
  if (!isPortalActive(state.phase)) return state;

  switch (event.type) {
    case "cancel":
      return { ...state, phase: "cancelled" };
    case "timeout":
      return { ...state, phase: "timed-out" };
    case "prepared":
      return state.phase === "preparing" ? { ...state, phase: "expanding" } : state;
    case "expanded":
      return state.phase === "expanding"
        ? { ...state, phase: state.ready ? "opening" : "waiting" }
        : state;
    case "ready":
      return { ...state, ready: true, phase: state.phase === "waiting" ? "opening" : state.phase };
    case "opened":
      return state.phase === "opening" ? { ...state, phase: "arriving" } : state;
    case "finished":
      return state.phase === "arriving" ? { ...state, phase: "complete" } : state;
  }
}
