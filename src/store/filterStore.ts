import { create } from "zustand";

interface FilterState {
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    priceRange: [0, 1000],
    setPriceRange: (range) => set({ priceRange: range }),
}));
