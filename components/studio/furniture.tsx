import type { FurnitureKind } from "@/lib/experience/studio-scene";

/**
 * Set pieces. Each piece is assembled from layered 3D surfaces (CSS
 * `preserve-3d`), so it has real depth, a floor contact shadow and gold
 * detailing instead of being a flat icon.
 */

/**
 * Wingback lounge chair: splayed brass legs, a piped seat cushion, a reclined
 * back with angled wings and a headrest roll — the silhouette a studio
 * guest chair actually has on camera.
 */
function Chair() {
  return (
    <div className="prop-chair">
      <span className="prop-chair__shadow" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--fl" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--fr" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--bl" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--br" aria-hidden="true" />
      <span className="prop-chair__back" aria-hidden="true" />
      <span className="prop-chair__glint" aria-hidden="true" />
      <span className="prop-chair__wing prop-chair__wing--l" aria-hidden="true" />
      <span className="prop-chair__wing prop-chair__wing--r" aria-hidden="true" />
      <span className="prop-chair__headrest" aria-hidden="true" />
      <span className="prop-chair__seat" aria-hidden="true" />
      <span className="prop-chair__piping" aria-hidden="true" />
      <span className="prop-chair__seat-lip" aria-hidden="true" />
      <span className="prop-chair__arm prop-chair__arm--l" aria-hidden="true" />
      <span className="prop-chair__arm prop-chair__arm--r" aria-hidden="true" />
      <span className="prop-chair__arm-pad prop-chair__arm-pad--l" aria-hidden="true" />
      <span className="prop-chair__arm-pad prop-chair__arm-pad--r" aria-hidden="true" />
    </div>
  );
}

/**
 * Low interview table: an oval glass top on a brass rim and cross-braced legs,
 * dressed with two cups and a sprig vase so the frame never reads as empty.
 */
function Table() {
  return (
    <div className="prop-table">
      <span className="prop-table__reflection" aria-hidden="true" />
      <span className="prop-table__apron" aria-hidden="true" />
      <span className="prop-table__leg prop-table__leg--l" aria-hidden="true" />
      <span className="prop-table__leg prop-table__leg--r" aria-hidden="true" />
      <span className="prop-table__brace" aria-hidden="true" />
      <span className="prop-table__shelf" aria-hidden="true" />
      <span className="prop-table__top" aria-hidden="true" />
      <span className="prop-table__sheen" aria-hidden="true" />
      <span className="prop-table__rim" aria-hidden="true" />
      <span className="prop-table__cup prop-table__cup--l" aria-hidden="true" />
      <span className="prop-table__cup prop-table__cup--r" aria-hidden="true" />
      <span className="prop-table__vase" aria-hidden="true" />
      <span className="prop-table__sprig prop-table__sprig--a" aria-hidden="true" />
      <span className="prop-table__sprig prop-table__sprig--b" aria-hidden="true" />
      <span className="prop-table__sprig prop-table__sprig--c" aria-hidden="true" />
    </div>
  );
}

function Mic() {
  return (
    <div className="prop-mic">
      <span className="prop-mic__shadow" aria-hidden="true" />
      <span className="prop-mic__base" aria-hidden="true" />
      <span className="prop-mic__pole" aria-hidden="true" />
      <span className="prop-mic__capsule" aria-hidden="true" />
      <span className="prop-mic__grill" aria-hidden="true" />
    </div>
  );
}

function Monitor() {
  return (
    <div className="prop-monitor">
      <span className="prop-monitor__shadow" aria-hidden="true" />
      <span className="prop-monitor__stand" aria-hidden="true" />
      <span className="prop-monitor__frame" aria-hidden="true">
        <span className="prop-monitor__screen" aria-hidden="true" />
      </span>
    </div>
  );
}

function Desk() {
  return (
    <div className="prop-desk">
      <span className="prop-desk__shadow" aria-hidden="true" />
      <span className="prop-desk__body" aria-hidden="true" />
      <span className="prop-desk__edge" aria-hidden="true" />
      <span className="prop-desk__fader prop-desk__fader--a" aria-hidden="true" />
      <span className="prop-desk__fader prop-desk__fader--b" aria-hidden="true" />
      <span className="prop-desk__led" aria-hidden="true" />
    </div>
  );
}

/** Potted olive: set dressing that anchors the empty corner of the floor. */
export function StudioPlant({ x, z }: { x: number; z: number }) {
  return (
    <div
      className="studio-plant"
      aria-hidden="true"
      style={{ transform: `translate3d(${x}px, 0px, ${z}px)` }}
    >
      <span className="studio-plant__shadow" />
      <span className="studio-plant__pot" />
      <span className="studio-plant__rim" />
      <span className="studio-plant__stem" />
      <span className="studio-plant__leaf studio-plant__leaf--a" />
      <span className="studio-plant__leaf studio-plant__leaf--b" />
      <span className="studio-plant__leaf studio-plant__leaf--c" />
      <span className="studio-plant__leaf studio-plant__leaf--d" />
      <span className="studio-plant__leaf studio-plant__leaf--e" />
    </div>
  );
}

export function FurnitureShape({ kind }: { kind: FurnitureKind }) {
  switch (kind) {
    case "chair":
      return <Chair />;
    case "table":
      return <Table />;
    case "mic":
      return <Mic />;
    case "monitor":
      return <Monitor />;
    case "desk":
      return <Desk />;
    default:
      return null;
  }
}
