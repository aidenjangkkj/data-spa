import { create } from "zustand";

interface FavoritesState {
  favoriteIds: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set<string>(),
  toggleFavorite: (id: string) =>
    set((state) => {
      const next = new Set(state.favoriteIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { favoriteIds: next };
    }),
  isFavorite: (id: string) => get().favoriteIds.has(id),
  clearFavorites: () => set({ favoriteIds: new Set<string>() }),
}));
