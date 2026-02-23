import { useMemo } from "react";
import { useViewerStore } from "../../store/viewerStore";
import type { RevRef } from "../../types/types";
import TargetMessages from "./TargetMessages";
import OverlayProgress from "./OverlayProgress";
import RevisionCard from "./RevisionCard";

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

  // 투명도
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

  // 선택
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
      <TargetMessages target={target} />

      <div className="flex flex-col gap-2">
        {list.map((r) => {
          const selected = isSelected(current, r);

          // Overlay 탭일 때  base와 완전히 같은 리비전은 의미 없으니 선택 안되게
          const sameAsBase =
            target === "OVERLAY" &&
            revision &&
            revision.space === r.space &&
            revision.discipline === r.discipline &&
            (revision.region ?? "") === (r.region ?? "") &&
            revision.revision.version === r.revision.version;

          return (
            <RevisionCard
              target={target}
              r={r}
              selected={selected}
              sameAsBase={sameAsBase}
              setORevision={setORevision}
              setRevision={setRevision}
            />
          );
        })}
      </div>

      {/* Overlay 탭일 때만 노출 */}
      {target === "OVERLAY" && !(!oSpace || !oDiscipline) && (
        <OverlayProgress
          overlayOpacity={overlayOpacity}
          setOverlayOpacity={setOverlayOpacity}
        />
      )}

      {/* 선택 / 공간 / 공종 비어있을 때 안내 메세지 */}
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
    </div>
  );
}
