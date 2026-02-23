import { useMemo } from "react";
import { useViewerStore } from "../../store/viewerStore";
import type { DisciplineKey, RegionKey, SpaceKey } from "../../types/types";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";
import SpaceList from "./SpaceList";
import DisciplinesLIst from "./DisciplinesList";
import RegionList from "./RegionList";

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

  //공간
  const spaces = index?.spaces ?? [];

  //active
  const activeSpace = target === "BASE" ? space : oSpace;
  const activeDiscipline = target === "BASE" ? discipline : oDiscipline;
  const activeRegion = target === "BASE" ? region : oRegion;

  // 공종
  const disciplines = useMemo(() => {
    if (!index || !activeSpace) return [];
    return index.disciplinesBySpace[activeSpace] ?? [];
  }, [index, activeSpace]);

  // 영역
  const regions = useMemo(() => {
    if (!index || !activeSpace || !activeDiscipline) return [];
    return index.regionsBySD[`${activeSpace}__${activeDiscipline}`] ?? [];
  }, [index, activeSpace, activeDiscipline]);

  // base 선택인지 overlay 선택인지
  const pickSpace = (v: SpaceKey) =>
    target === "BASE" ? setSpace(v) : setOSpace(v);
  const pickDiscipline = (v: DisciplineKey) =>
    target === "BASE" ? setDiscipline(v) : setODiscipline(v);
  const pickRegion = (v: RegionKey) =>
    target === "BASE" ? setRegion(v) : setORegion(v);

  return (
    <div className="flex flex-col gap-3 bg-gray-100 border border-gray-300 p-3 overflow-auto">
      <h1 className="text-4xl font-bold">
        <Link to="/" onClick={() => window.location.reload()}>
          TIMWORK
        </Link>
      </h1>
      <Tabs target={target} setTarget={setTarget} />
      <h3 className="font-semibold">공간</h3>
      <SpaceList
        spaces={spaces}
        target={target}
        activeSpace={activeSpace}
        pickSpace={pickSpace}
      />
      <h3 className="font-semibold">공종</h3>
      <DisciplinesLIst
        disciplines={disciplines}
        target={target}
        activeDiscipline={activeDiscipline}
        pickDiscipline={pickDiscipline}
      />
      {regions.length > 0 && (
        <>
          <div className="font-semibold">영역</div>
          <RegionList
            regions={regions}
            target={target}
            pickRegion={pickRegion}
            activeRegion={activeRegion}
          />
        </>
      )}
    </div>
  );
}
