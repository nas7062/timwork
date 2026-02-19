import type { DrawingDiscipline, Index, Metadata } from "../types/types";

function keySD(space: string, disc: string) {
  return `${space}__${disc}`;
}
function keySDR(space: string, disc: string, region?: string) {
  return `${space}__${disc}__${region ?? ""}`;
}

export function buildIndex(meta: Metadata): Index {
  // drawings 값들을 배열로
  const drawings = Object.values(meta.drawings);

  // 전체 찾기
  const site = drawings.find(
    (d) => d.name.includes("전체") || d.image.includes("00_전체")
  );
  const siteId = site?.id;

  //나머지  공간 목록 추출
  const spaces = drawings
    .filter(
      (d) =>
        d.parent != null &&
        (siteId == null ? true : d.parent === String(siteId))
    )
    .map((d) => d.name);

  const disciplinesBySpace: Index["disciplinesBySpace"] = {};
  const regionsBySD: Index["regionsBySD"] = {};
  const revisionsBySDR: Index["revisionsBySDR"] = {};
  const baseBySpace: Index["baseBySpace"] = {};

  for (const spaceName of spaces) {
    // 공간 도면 찾기
    const spaceDrawing = drawings.find((d) => d.name === spaceName);
    //공종 목록
    const disciplines = Object.keys(spaceDrawing?.disciplines ?? {});
    disciplinesBySpace[spaceName] = disciplines;
    // 건축 도면 이미지가 있으면 그걸 기준(base)로 삼고 건축이 없으면 첫 공종의 image
    const arch = (spaceDrawing?.disciplines ?? {})["건축"];
    const fallback = disciplines.length
      ? (spaceDrawing?.disciplines ?? {})[disciplines[0]]
      : undefined;
    baseBySpace[spaceName] =
      arch?.image ?? fallback?.image ?? spaceDrawing?.image ?? "";

    for (const disc of disciplines) {
      //공종 데이터
      const discData: DrawingDiscipline = (spaceDrawing?.disciplines ?? {})[
        disc
      ];
      const rkey = keySD(spaceName, disc);

      //regions가 있으면: region별 revisions를 인덱싱
      if (discData.regions && Object.keys(discData.regions).length) {
        const regions = Object.keys(discData.regions);
        regionsBySD[rkey] = regions;

        for (const region of regions) {
          const regionData = discData.regions[region];
          const revs = regionData.revisions ?? [];
          revisionsBySDR[keySDR(spaceName, disc, region)] = revs.map(
            (revision) => ({
              space: spaceName,
              discipline: disc,
              region,
              revision,
              baseImage: discData.image ?? baseBySpace[spaceName],
            })
          );
        }
      }
      //regions가 없으면: discipline.revisions만 인덱싱
      else {
        regionsBySD[rkey] = [];
        const revs = discData.revisions ?? [];
        revisionsBySDR[keySDR(spaceName, disc)] = revs.map((revision) => ({
          space: spaceName,
          discipline: disc,
          revision,
          baseImage: discData.image ?? baseBySpace[spaceName],
        }));
      }
    }
  }

  return {
    spaces,
    disciplinesBySpace,
    regionsBySD,
    revisionsBySDR,
    baseBySpace,
  };
}
