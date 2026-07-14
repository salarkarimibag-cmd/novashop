import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedBrands: [],
  selectedCategories: [],
  sort: "newest",

  priceRange: {
    min: 0,
    max: Infinity,
  },

  toggleBrand: (brand) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((item) => item !== brand)
        : [...state.selectedBrands, brand],
    })),

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((item) => item !== category)
        : [...state.selectedCategories, category],
    })),

  setSort: (sort) => set({ sort }),

  setPriceRange: (min, max) =>
    set({
      priceRange: {
        min,
        max,
      },
    }),

  resetFilters: () =>
    set({
      selectedBrands: [],
      selectedCategories: [],
      sort: "newest",
      priceRange: {
        min: 0,
        max: Infinity,
      },
    }),
}));

export default useFilterStore;
