export default function Loading() {
  return (
    <div className="shell status-page" aria-busy="true">
      <div className="status-page__inner">
        <p className="eyebrow">Basma Moussa</p>
        <div
          aria-hidden="true"
          style={{
            width: "min(70vw, 420px)",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(242,215,160,.7), transparent)",
            animation: "caption-in .8s ease forwards",
            opacity: 0.6,
          }}
        />
        <p style={{ color: "var(--muted)" }}>…</p>
      </div>
    </div>
  );
}
