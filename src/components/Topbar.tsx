import { useViewerStore } from "../store/viewerStore";

export default function Topbar() {
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const revision = useViewerStore((s) => s.revision);
  const overlay = useViewerStore((s) => s.overlay);

  const path = [
    "전체",
    space ?? "-",
    discipline ?? "-",
    region ?? undefined,
    revision?.revision.version ?? "-",
  ]
    .filter(Boolean)
    .join(" > ");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontWeight: 600 }}>{path}</div>
      <div className="ml-auto text-sm text-[#2563EB]">
        <p> Base: {revision?.revision.image ?? "-"}</p>
        <p>
          Overlay:
          {overlay?.revision.image ?? "-"}
        </p>
      </div>
      <div></div>
    </div>
  );
}
