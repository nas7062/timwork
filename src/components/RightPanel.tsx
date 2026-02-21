import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";
import clsx from "clsx";
import type { RevRef } from "../types/types";

export default function RightPanel() {
  const index = useViewerStore((s) => s.index);
  const target = useViewerStore((s) => s.target);

  // BASE
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const revision = useViewerStore((s) => s.revision);
  const setRevision = useViewerStore((s) => s.setRevision);

  // OVERLAY
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

  // 화면에 뿌릴 목록/상태를 target에 따라 선택
  const list = target === "BASE" ? baseRevs : overlayRevs;
  const current = target === "BASE" ? revision : oRevision;

  return (
    <div className="border-l bg-gray-100 border-l-gray-300 p-3 overflow-auto h-screen flex flex-col gap-3 bg-gray=50">
      <div className="font-semibold flex items-center justify-between">
        <span>{target === "BASE" ? "Base 리비전" : "Overlay 리비전"}</span>
        <span
          className={clsx(
            "text-xs font-semibold px-2 py-0.5 rounded",
            target === "BASE"
              ? "bg-gray-100 text-gray-700"
              : " bg-gray-100 text-[#5d8bee]"
          )}
        >
          {target}
        </span>
      </div>

      {/* 선택 축이 비어있을 때 안내 */}
      {target === "BASE" && (!space || !discipline) && (
        <div className="text-lg text-gray-700 flex justify-center items-center h-screen">
          좌측에서 Base 공간/공종 <br />
          혹은 영역을 선택하세요.
        </div>
      )}
      {target === "OVERLAY" && (!oSpace || !oDiscipline) && (
        <div className="text-lg text-gray-700 flex justify-center items-center h-screen">
          좌측에서 Overlay 공간/공종 <br />
          혹은 영역을 선택하세요.
        </div>
      )}

      <div className="flex flex-col gap-2">
        {list.map((r) => {
          const selected = isSelected(current, r);

          // Overlay 탭일 때: base와 완전히 같은 리비전은 의미 없으니 막음
          const sameAsBase =
            target === "OVERLAY" &&
            revision &&
            revision.space === r.space &&
            revision.discipline === r.discipline &&
            (revision.region ?? "") === (r.region ?? "") &&
            revision.revision.version === r.revision.version;

          return (
            <div
              key={`${target}__${r.space}__${r.discipline}__${
                r.region ?? ""
              }__${r.revision.version}`}
              className="border border-gray-200 p-2 bg-white rounded-lg flex flex-col gap-1 shadow"
            >
              <div className="font-semibold flex justify-between">
                <p>개정 버전 : {r.revision.version}</p>
                {selected ? (
                  <span
                    className={clsx(
                      "text-xs font-semibold",
                      target === "BASE" ? "text-gray-700" : "text-blue-600"
                    )}
                  >
                    {target}
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
                  "mt-2 w-full rounded-md px-2 py-1.5 transition-colors cursor-pointer",
                  sameAsBase
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : selected
                    ? "bg-gray-700 text-white "
                    : target === "BASE"
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-[#5d8bee] text-white hover:bg-blue-500"
                )}
                onClick={() => {
                  if (sameAsBase) return;

                  if (target === "BASE") {
                    if (selected) return;
                    setRevision(r);
                  } else {
                    setORevision(selected ? null : r);
                  }
                }}
              >
                {target === "BASE"
                  ? selected
                    ? "현재 Base"
                    : "Base로 보기"
                  : selected
                  ? "Overlay 해제"
                  : "Overlay로 보기"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Overlay 탭일 때만 노출 */}
      {target === "OVERLAY" && !(!oSpace || !oDiscipline) && (
        <>
          <div className="font-semibold mt-2">Overlay 투명도</div>
          <div className="flex justify-between text-xs text-gray-500">
            <p>투명</p>
            <p>불투명</p>
          </div>
          <input
            type="range"
            className="w-full accent-[#5d8bee] "
            min={0}
            max={100}
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(Number(e.target.value))}
          />
        </>
      )}
    </div>
  );
}
