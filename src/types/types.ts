export type Vec2 = [number, number];

/** 프로젝트 정보 */
export interface ProjectMeta {
  name: string;
  unit: "px" | string;
}

/** 공종 목록 항목 */
export interface DisciplineMeta {
  name:
    | "건축"
    | "구조"
    | "공조설비"
    | "배관설비"
    | "설비"
    | "소방"
    | "조경"
    | string;
}

/** 이미지 정렬 변환 */
export interface ImageTransform {
  relativeTo: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

/** 폴리곤 렌더링 변환 */
export interface PolygonTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

/** 관심 영역 폴리곤 */
export interface Polygon {
  vertices: Vec2[];
  polygonTransform: PolygonTransform;
}

/** 리비전 */
export interface Revision {
  version: string;
  image: string;
  date: string;
  description: string;
  changes: string[];

  imageTransform?: ImageTransform;
  polygon?: Polygon;
}

/** Region */
export interface Region {
  polygon?: Polygon;
  revisions: Revision[];
}

/** Drawing 내부 공종 데이터 */
export interface DrawingDiscipline {
  image?: string;
  imageTransform?: ImageTransform;
  polygon?: Polygon;
  regions?: Record<string, Region>;
  revisions?: Revision[];
}

/** position */
export interface DrawingPosition {
  vertices: Vec2[];
  imageTransform: ImageTransform;
}

/** 도면(Drawing) */
export interface Drawing {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  position: DrawingPosition | null;
  disciplines?: Record<string, DrawingDiscipline>;
}

export interface Metadata {
  project: ProjectMeta;
  disciplines: DisciplineMeta[];
  drawings: Record<string, Drawing>;
}
