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
    <div className="flex items-center py-3  px-2 shadow rounded-md border-b border-b-gray-300">
      <div className="font-semibold ">{path}</div>
      <div className="ml-auto text-sm font-semibold text-[#2563EB]">
        <p> Base: {revision?.revision.image.split(".")[0] ?? "-"}</p>
        <p>
          Overlay:
          {overlay?.revision.image.split(".")[0] ?? "-"}
        </p>
      </div>
      <div></div>
    </div>
  );
}
