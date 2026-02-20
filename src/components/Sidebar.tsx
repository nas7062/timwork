import { useMemo } from "react";
import { useViewerStore } from "../store/viewerStore";
import clsx from "clsx";
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
    <div className="flex flex-col gap-3 bg-[#E5E7EB] border border-gray-200 p-3 overflow-auto">
      <h1 className="text-4xl font-bold">TIMWORK</h1>
      <h3 className="font-semibold">공간</h3>
      <div className="flex flex-col gap-1">
        {spaces.map((s) => (
          <button
            key={s}
            onClick={() => setSpace(s)}
            className={clsx(
              "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer ",
              s === space ? "bg-[#2563EB]  text-white" : "bg-white"
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
            onClick={() => setDiscipline(d)}
            className={clsx(
              "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer",
              d === discipline ? "bg-[#2563EB]  text-white" : "bg-white"
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
                onClick={() => setRegion(r)}
                className={clsx(
                  "p-2 border border-gray-300 transition-colors duration-300 rounded-md cursor-pointer",
                  r === region ? "bg-[#2563EB] text-white" : "bg-white"
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
