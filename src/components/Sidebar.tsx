import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";

export default function Sidebar() {
  const index = useViewerStore((s) => s.index);
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);

  const setSpace = useViewerStore((s) => s.setSpace);
  const setDiscipline = useViewerStore((s) => s.setDiscipline);
  const setRegion = useViewerStore((s) => s.setRegion);

  const spaces = index?.spaces ?? [];

  const disciplines = useMemo(() => {
    if (!index || !space) return [];
    return index.disciplinesBySpace[space] ?? [];
  }, [index, space]);

  const regions = useMemo(() => {
    if (!index || !space || !discipline) return [];
    return index.regionsBySD[`${space}__${discipline}`] ?? [];
  }, [index, space, discipline]);

  return (
    <div
      style={{
        borderRight: "1px solid #e5e7eb",
        padding: 12,
        overflow: "auto",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>공간</div>
      <div style={{ display: "grid", gap: 6 }}>
        {spaces.map((s) => (
          <button
            key={s}
            onClick={() => setSpace(s)}
            style={{
              textAlign: "left",
              padding: 8,
              border: "1px solid #e5e7eb",
              background: s === space ? "#f3f4f6" : "white",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ height: 16 }} />

      <div style={{ fontWeight: 700, marginBottom: 8 }}>공종</div>
      <div style={{ display: "grid", gap: 6 }}>
        {disciplines.map((d) => (
          <button
            key={d}
            onClick={() => setDiscipline(d)}
            style={{
              textAlign: "left",
              padding: 8,
              border: "1px solid #e5e7eb",
              background: d === discipline ? "#f3f4f6" : "white",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {regions.length > 0 && (
        <>
          <div style={{ height: 16 }} />
          <div style={{ fontWeight: 700, marginBottom: 8 }}>영역(Region)</div>
          <div style={{ display: "grid", gap: 6 }}>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                style={{
                  textAlign: "left",
                  padding: 8,
                  border: "1px solid #e5e7eb",
                  background: r === region ? "#f3f4f6" : "white",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
