import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";

export default function RightPanel() {
  const index = useViewerStore((s) => s.index);
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const overlay = useViewerStore((s) => s.overlay);
  const setRevision = useViewerStore((s) => s.setRevision);
  const setOverlay = useViewerStore((s) => s.setOverlay);
  const setOverlayOpacity = useViewerStore((s) => s.setOverlayOpacity);

  const revs = useMemo(() => {
    if (!index || !space || !discipline) return [];
    return (
      index.revisionsBySDR[`${space}__${discipline}__${region ?? ""}`] ?? []
    );
  }, [index, space, discipline, region]);

  const isSameOverlay = (r: (typeof revs)[number]) => {
    if (!overlay) return false;
    return (
      overlay.space === r.space &&
      overlay.discipline === r.discipline &&
      (overlay.region ?? "") === (r.region ?? "") &&
      overlay.revision.version === r.revision.version
    );
  };
  return (
    <div
      style={{ borderLeft: "1px solid #e5e7eb", padding: 12, overflow: "auto" }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>리비전</div>
      <div style={{ display: "grid", gap: 8 }}>
        {revs.map((r) => {
          const selected = isSameOverlay(r);

          return (
            <div
              key={`${r.space}__${r.discipline}__${r.region ?? ""}__${
                r.revision.version
              }`}
              style={{
                border: "1px solid #e5e7eb",
                padding: 8,
                background: "white",
              }}
            >
              <div style={{ fontWeight: 600 }}>{r.revision.version}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {r.revision.date}
              </div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                {r.revision.description}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  onClick={() => {
                    setRevision(r);
                    setOverlay(null);
                  }}
                  style={{ padding: "6px 8px" }}
                >
                  Base로 보기
                </button>

                <button
                  onClick={() => (selected ? setOverlay(null) : setOverlay(r))}
                  style={{
                    padding: "6px 8px",
                  }}
                >
                  {selected ? "Overlay 해제" : "Overlay로 보기"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 16 }} />
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Overlay 투명도</div>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={60}
        onChange={(e) => setOverlayOpacity(Number(e.target.value))}
      />
    </div>
  );
}
