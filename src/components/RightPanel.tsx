import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";
import clsx from "clsx";

export default function RightPanel() {
  const index = useViewerStore((s) => s.index);
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const revision = useViewerStore((s) => s.revision);
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

  // overlay 구분
  const isSameOverlay = (r: (typeof revs)[number]) => {
    if (!overlay) return false;
    return (
      overlay.space === r.space &&
      overlay.discipline === r.discipline &&
      (overlay.region ?? "") === (r.region ?? "") &&
      overlay.revision.version === r.revision.version
    );
  };

  // base 구분
  const isSelectedBase = (r: (typeof revs)[number]) => {
    if (!revision) return false;

    return (
      revision.space === r.space &&
      revision.discipline === r.discipline &&
      (revision.region ?? "") === (r.region ?? "") &&
      revision.revision.version === r.revision.version
    );
  };

  return (
    <div className="border-l border-l-gray-200 p-3 overflow-auto h-screen flex flex-col gap-2">
      <div className="font-semibold flex gap-2 items-center">
        <h3>리비전</h3>

        <div className="relative group">
          <p className="border-2 border-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs text-red-500 cursor-pointer">
            i
          </p>

          <div className="absolute -left-16 top-7 w-70 bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
            • Base는 기준 도면입니다.
            <br />
            • Overlay는 선택한 도면을 겹쳐 비교합니다.
            <br />• Base와 동일한 리비전은 Overlay로 선택할 수 없습니다.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {revs.map((r) => {
          const selected = isSameOverlay(r);
          const selectedBase = isSelectedBase(r);
          const isSameAsBase = (r: (typeof revs)[number]) => {
            return isSelectedBase(r);
          };
          return (
            <div
              key={`${r.space}__${r.discipline}__${r.region ?? ""}__${
                r.revision.version
              }`}
              className="border border-gray-200 p-2 bg-white rounded-lg flex flex-col gap-1"
            >
              <div className="font-semibold flex justify-between ">
                <p>개정 버전 : {r.revision.version}</p>
                <p
                  className={clsx(selected ? "text-[#2563EB]" : "text-red-400")}
                >
                  {selectedBase ? "base" : selected ? "overlay" : ""}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                개정 날짜 : {r.revision.date}
              </div>
              <div className="text-xs text-gray-700">
                개정 설명 : {r.revision.description}
              </div>

              <div className="flex justify-around mt-4 gap-2">
                <button
                  className="flex-1 bg-red-400 text-white rounded-md px-2 py-1.5 cursor-pointer hover:bg-red-500 transition-colors duration-200"
                  onClick={() => {
                    setRevision(r);

                    if (
                      overlay &&
                      overlay.revision.version === r.revision.version
                    ) {
                      setOverlay(null);
                    }
                  }}
                >
                  {selectedBase ? "현재 base" : "base로 보기"}
                </button>

                <button
                  disabled={isSameAsBase(r)}
                  className={clsx(
                    "flex-1 rounded-md px-2 py-1.5 transition-colors duration-200",
                    isSameAsBase(r)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#2563EB] text-white hover:bg-blue-700 cursor-pointer"
                  )}
                  onClick={() => {
                    if (isSameAsBase(r)) return;

                    selected ? setOverlay(null) : setOverlay(r);
                  }}
                >
                  {selected ? "Overlay 해제" : "Overlay로 보기"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="font-semibold">Overlay 투명도</div>
      <div className="flex justify-between text-xs text-gray-500">
        <p>투명</p>
        <p>불투명</p>
      </div>
      <input
        type="range"
        className="w-full"
        min={0}
        max={100}
        defaultValue={60}
        onChange={(e) => setOverlayOpacity(Number(e.target.value))}
      />
    </div>
  );
}
