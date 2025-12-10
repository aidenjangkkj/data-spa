import { create } from "zustand";
import type { SearchParams } from "../model/searchParams.types";

export type ViewMode = "LIST" | "FAVORITES";

interface SearchState {
  params: SearchParams;
  viewMode: ViewMode;
  setParams: (next: Partial<SearchParams>) => void;
  setViewMode: (mode: ViewMode) => void;
  reset: () => void;
}

const initialParams: SearchParams = {
  country: "KR",

  keyword: "",
  applicationNumber: "",

  publicationNumber: "",
  registrationPubNumber: "",

  registrationNumber: "",
  mainClass: "",
  subClass: "",

  registerStatus: "ALL",
};

export const useSearchStore = create<SearchState>((set) => ({
  params: initialParams,
  viewMode: "LIST",
  setParams: (next) =>
    set((state) => ({
      params: { ...state.params, ...next },
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
  reset: () =>
    set({
      params: initialParams,
      viewMode: "LIST",
    }),
}));
