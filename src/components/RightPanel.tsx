import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";
import clsx from "clsx";
import type { RevRef } from "../types/types";

export default function RightPanel() {
  const index = useViewerStore((s) => s.index);

  // BASE 선택축
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const revision = useViewerStore((s) => s.revision);
  const setRevision = useViewerStore((s) => s.setRevision);

  // OVERLAY 선택축
  const oSpace = useViewerStore((s) => s.oSpace);
  const oDiscipline = useViewerStore((s) => s.oDiscipline);
  const oRegion = useViewerStore((s) => s.oRegion);
  const oRevision = useViewerStore((s) => s.oRevision);
  const setORevision = useViewerStore((s) => s.setORevision);

  const overlayOpacity = useViewerStore((s) => s.overlayOpacity);
  const setOverlayOpacity = useViewerStore((s) => s.setOverlayOpacity);

  const baseRevs = useMemo(() => {
    if (!index || !space || !discipline) return [];
    return (
      index.revisionsBySDR[`${space}__${discipline}__${region ?? ""}`] ?? []
    );
  }, [index, space, discipline, region]);

  const overlayRevs = useMemo(() => {
    if (!index || !oSpace || !oDiscipline) return [];
    return (
      index.revisionsBySDR[`${oSpace}__${oDiscipline}__${oRegion ?? ""}`] ?? []
    );
  }, [index, oSpace, oDiscipline, oRegion]);

  const isSelected = (cur: RevRef | null, r: RevRef) => {
    if (!cur) return false;
    return (
      cur.space === r.space &&
      cur.discipline === r.discipline &&
      (cur.region ?? "") === (r.region ?? "") &&
      cur.revision.version === r.revision.version
    );
  };

  return (
    <div className="border-l border-l-gray-200 p-3 overflow-auto h-screen flex flex-col gap-4">
      {/* BASE 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Base 리비전</div>
        <div className="flex flex-col gap-2">
          {baseRevs.map((r) => {
            const selectedBase = isSelected(revision, r);
            return (
              <div
                key={`base__${r.space}__${r.discipline}__${r.region ?? ""}__${r.revision.version}`}
                className="border border-gray-200 p-2 bg-white rounded-lg flex flex-col gap-1"
              >
                <div className="font-semibold flex justify-between">
                  <p>개정 버전 : {r.revision.version}</p>
                  {selectedBase ? (
                    <span className="text-xs text-red-500 font-semibold">
                      BASE
                    </span>
                  ) : null}
                </div>
                <div className="text-xs text-gray-500">
                  개정 날짜 : {r.revision.date}
                </div>
                <div className="text-xs text-gray-700">
                  개정 설명 : {r.revision.description}
                </div>

                <button
                  className={clsx(
                    "mt-2 w-full rounded-md px-2 py-1.5 transition-colors",
                    selectedBase
                      ? "bg-gray-200 text-gray-600 cursor-default"
                      : "bg-red-400 text-white hover:bg-red-500"
                  )}
                  onClick={() => {
                    if (selectedBase) return;
                    setRevision(r);
                  }}
                >
                  {selectedBase ? "현재 Base" : "Base로 보기"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* OVERLAY 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Overlay 리비전</div>

        <div className="flex flex-col gap-2">
          {overlayRevs.map((r) => {
            const selectedOv = isSelected(oRevision, r);

            // Base와 “완전히 같은 리비전”을 Overlay로 막는 것(동일 축일 때 의미 있음)
            const sameAsBase =
              revision &&
              revision.space === r.space &&
              revision.discipline === r.discipline &&
              (revision.region ?? "") === (r.region ?? "") &&
              revision.revision.version === r.revision.version;

            return (
              <div
                key={`ov__${r.space}__${r.discipline}__${r.region ?? ""}__${r.revision.version}`}
                className="border border-gray-200 p-2 bg-white rounded-lg flex flex-col gap-1"
              >
                <div className="font-semibold flex justify-between">
                  <p>개정 버전 : {r.revision.version}</p>
                  {selectedOv ? (
                    <span className="text-xs text-blue-600 font-semibold">
                      OVERLAY
                    </span>
                  ) : null}
                </div>

                <div className="text-xs text-gray-500">
                  개정 날짜 : {r.revision.date}
                </div>
                <div className="text-xs text-gray-700">
                  개정 설명 : {r.revision.description}
                </div>

                <button
                  disabled={!!sameAsBase}
                  className={clsx(
                    "mt-2 w-full rounded-md px-2 py-1.5 transition-colors",
                    sameAsBase
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : selectedOv
                        ? "bg-gray-900 text-white hover:bg-black"
                        : "bg-[#2563EB] text-white hover:bg-blue-700"
                  )}
                  onClick={() => {
                    if (sameAsBase) return;
                    setORevision(selectedOv ? null : r);
                  }}
                >
                  {selectedOv ? "Overlay 해제" : "Overlay로 보기"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="font-semibold mt-2">Overlay 투명도</div>
        <div className="flex justify-between text-xs text-gray-500">
          <p>투명</p>
          <p>불투명</p>
        </div>
        <input
          type="range"
          className="w-full"
          min={0}
          max={100}
          value={overlayOpacity}
          onChange={(e) => setOverlayOpacity(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
