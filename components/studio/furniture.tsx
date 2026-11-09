import type { FurnitureKind } from "@/lib/experience/studio-scene";

/**
 * Set pieces. Each piece is assembled from layered 3D surfaces (CSS
 * `preserve-3d`), so it has real depth, a floor contact shadow and gold
 * detailing instead of being a flat icon.
 */

function Chair() {
  return (
    <div className="prop-chair">
      <span className="prop-chair__shadow" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--l" aria-hidden="true" />
      <span className="prop-chair__leg prop-chair__leg--r" aria-hidden="true" />
      <span className="prop-chair__base" aria-hidden="true" />
      <span className="prop-chair__seat" aria-hidden="true" />
      <span className="prop-chair__seat-trim" aria-hidden="true" />
      <span className="prop-chair__back" aria-hidden="true" />
      <span className="prop-chair__back-trim" aria-hidden="true" />
      <span className="prop-chair__arm prop-chair__arm--l" aria-hidden="true" />
      <span className="prop-chair__arm prop-chair__arm--r" aria-hidden="true" />
    </div>
  );
}

function Table() {
  return (
    <div className="prop-table">
      <span className="prop-table__reflection" aria-hidden="true" />
      <span className="prop-table__top" aria-hidden="true" />
      <span className="prop-table__rim" aria-hidden="true" />
      <span className="prop-table__edge" aria-hidden="true" />
      <span className="prop-table__leg prop-table__leg--l" aria-hidden="true" />
      <span className="prop-table__leg prop-table__leg--r" aria-hidden="true" />
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
