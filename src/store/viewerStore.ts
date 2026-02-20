import { create } from "zustand";
import type { DisciplineKey, Index, RegionKey, RevRef, SpaceKey } from "../types/types";

type Mode = "VIEW" | "COMPARE";

interface ViewerState {
  index: Index | null;

  space: SpaceKey | null;
  discipline: DisciplineKey | null;
  region: RegionKey | null;

  revision: RevRef | null; 
  overlay: RevRef | null; 
  overlayOpacity: number;

  mode: Mode;

  setIndex: (idx: Index) => void;
  setSpace: (v: SpaceKey | null) => void;
  setDiscipline: (v: DisciplineKey | null) => void;
  setRegion: (v: RegionKey | null) => void;
  setRevision: (v: RevRef | null) => void;
  setOverlay: (v: RevRef | null) => void;
  setOverlayOpacity: (v: number) => void;
  setMode: (v: Mode) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  index: null,

  space: null,
  discipline: null,
  region: null,

  revision: null,
  overlay: null,
  overlayOpacity: 60,

  mode: "VIEW",

  setIndex: (index) => set({ index }),
  setSpace: (space) =>
    set({
      space,
      discipline: null,
      region: null,
      revision: null,
      overlay: null,
    }),
  setDiscipline: (discipline) =>
    set({ discipline, region: null, revision: null, overlay: null }),
  setRegion: (region) => set({ region, revision: null, overlay: null }),
  setRevision: (revision) => set({ revision }),
  setOverlay: (overlay) => set({ overlay }),
  setOverlayOpacity: (overlayOpacity) => set({ overlayOpacity }),
  setMode: (mode) => set({ mode }),
}));
