import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";
import clsx from "clsx";
import type { DisciplineKey, RegionKey, SpaceKey } from "../types/types";

export default function Sidebar() {
  const index = useViewerStore((s) => s.index);

  const target = useViewerStore((s) => s.target);
  const setTarget = useViewerStore((s) => s.setTarget);

  // BASE
  const space = useViewerStore((s) => s.space);
  const discipline = useViewerStore((s) => s.discipline);
  const region = useViewerStore((s) => s.region);
  const setSpace = useViewerStore((s) => s.setSpace);
  const setDiscipline = useViewerStore((s) => s.setDiscipline);
  const setRegion = useViewerStore((s) => s.setRegion);

  // OVERLAY
  const oSpace = useViewerStore((s) => s.oSpace);
  const oDiscipline = useViewerStore((s) => s.oDiscipline);
  const oRegion = useViewerStore((s) => s.oRegion);
  const setOSpace = useViewerStore((s) => s.setOSpace);
  const setODiscipline = useViewerStore((s) => s.setODiscipline);
  const setORegion = useViewerStore((s) => s.setORegion);

  const spaces = index?.spaces ?? [];

  const activeSpace = target === "BASE" ? space : oSpace;
  const activeDiscipline = target === "BASE" ? discipline : oDiscipline;
  const activeRegion = target === "BASE" ? region : oRegion;

  const disciplines = useMemo(() => {
    if (!index || !activeSpace) return [];
    return index.disciplinesBySpace[activeSpace] ?? [];
  }, [index, activeSpace]);

  const regions = useMemo(() => {
    if (!index || !activeSpace || !activeDiscipline) return [];
    return index.regionsBySD[`${activeSpace}__${activeDiscipline}`] ?? [];
  }, [index, activeSpace, activeDiscipline]);

  const pickSpace = (v: SpaceKey) =>
    target === "BASE" ? setSpace(v) : setOSpace(v);
  const pickDiscipline = (v: DisciplineKey) =>
    target === "BASE" ? setDiscipline(v) : setODiscipline(v);
  const pickRegion = (v: RegionKey) =>
    target === "BASE" ? setRegion(v) : setORegion(v);

  return (
    <div className="flex flex-col gap-3 bg-[#eff0f0] border border-gray-200 p-3 overflow-auto">
      <h1 className="text-4xl font-bold">TIMWORK</h1>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setTarget("BASE")}
          className={clsx(
            "p-2 rounded-md  transition-colors cursor-pointer",
            target === "BASE" ? "bg-gray-600 text-white" : "bg-white"
          )}
        >
          Base 선택
        </button>
        <button
          onClick={() => setTarget("OVERLAY")}
          className={clsx(
            "p-2 rounded-md transition-colors cursor-pointer",
            target === "OVERLAY" ? "bg-blue-500 text-white" : "bg-white"
          )}
        >
          Overlay 선택
        </button>
      </div>

      <h3 className="font-semibold">공간</h3>
      <div className="flex flex-col gap-1">
        {spaces.map((s) => (
          <button
            key={s}
            onClick={() => pickSpace(s)}
            className={clsx(
              "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer hover:border-blue-500",
              s === activeSpace &&
                target === "BASE" &&
                "bg-gray-600 text-white",
              s === activeSpace &&
                target === "OVERLAY" &&
                "bg-[#5d8bee] text-white",
              !(s === activeSpace) && "bg-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <h3 className="font-semibold">공종</h3>
      <div className="flex flex-col gap-1">
        {disciplines.map((d) => (
          <button
            key={d}
            onClick={() => pickDiscipline(d)}
            className={clsx(
              "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer hover:border-blue-500",
              d === activeDiscipline &&
                target === "BASE" &&
                "bg-gray-600 text-white",
              d === activeDiscipline &&
                target === "OVERLAY" &&
                "bg-[#5d8bee] text-white",
              !(d === activeDiscipline) && "bg-white"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {regions.length > 0 && (
        <>
          <div className="font-semibold">영역</div>
          <div className="flex flex-col gap-1">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => pickRegion(r)}
                className={clsx(
                  "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer hover:border-blue-500",
                  r === activeRegion &&
                    target === "BASE" &&
                    "bg-gray-600 text-white",
                  r === activeRegion &&
                    target === "OVERLAY" &&
                    "bg-[#5d8bee] text-white",
                  !(r === activeRegion) && "bg-white"
                )}
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
