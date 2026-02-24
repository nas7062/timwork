import { create } from 'zustand';
import type {
  DisciplineKey,
  Index,
  RegionKey,
  RevRef,
  SpaceKey,
} from '../types/types';

type Mode = 'VIEW' | 'COMPARE';
export type Target = 'BASE' | 'OVERLAY';

interface ViewerState {
  index: Index | null;

  // BASE 선택
  space: SpaceKey | null;
  discipline: DisciplineKey | null;
  region: RegionKey | null;
  revision: RevRef | null;

  // OVERLAY 선택
  oSpace: SpaceKey | null;
  oDiscipline: DisciplineKey | null;
  oRegion: RegionKey | null;
  oRevision: RevRef | null;

  overlayOpacity: number;

  mode: Mode;
  target: Target;

  setIndex: (idx: Index) => void;

  setSpace: (v: SpaceKey | null) => void;
  setDiscipline: (v: DisciplineKey | null) => void;
  setRegion: (v: RegionKey | null) => void;
  setRevision: (v: RevRef | null) => void;

  setOSpace: (v: SpaceKey | null) => void;
  setODiscipline: (v: DisciplineKey | null) => void;
  setORegion: (v: RegionKey | null) => void;
  setORevision: (v: RevRef | null) => void;

  setOverlayOpacity: (v: number) => void;
  setMode: (v: Mode) => void;
  setTarget: (v: Target) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  index: null,

  // BASE
  space: null,
  discipline: null,
  region: null,
  revision: null,

  // OVERLAY
  oSpace: null,
  oDiscipline: null,
  oRegion: null,
  oRevision: null,

  overlayOpacity: 70,

  mode: 'VIEW',
  target: 'BASE',

  setIndex: (index) => set({ index }),

  // BASE setters
  setSpace: (space) =>
    set({
      space,
      discipline: null,
      region: null,
      revision: null,
      oRevision: null,
    }),
  setDiscipline: (discipline) =>
    set({ discipline, region: null, revision: null, oRevision: null }),
  setRegion: (region) => set({ region, revision: null, oRevision: null }),
  setRevision: (revision) => set({ revision }),

  setOSpace: (oSpace) =>
    set({
      oSpace,
      oDiscipline: null,
      oRegion: null,
      oRevision: null,
    }),
  setODiscipline: (oDiscipline) =>
    set({ oDiscipline, oRegion: null, oRevision: null }),
  setORegion: (oRegion) => set({ oRegion, oRevision: null }),
  setORevision: (oRevision) => set({ oRevision }),

  setOverlayOpacity: (overlayOpacity) => set({ overlayOpacity }),
  setMode: (mode) => set({ mode }),
  setTarget: (target) => set({ target }),
}));
