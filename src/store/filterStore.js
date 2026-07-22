import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedBrands: [],

  selectedCategories: [],

  sort: "newest",

  priceRange: [0, 100000000],

  searchQuery: "",

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

  setSort: (sort) =>
    set({
      sort,
    }),

  setPriceRange: (range) =>
    set({
      priceRange: range,
    }),

  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  clearFilters: () =>
    set({
      selectedBrands: [],
      selectedCategories: [],
      sort: "newest",
      priceRange: [0, 100000000],
      searchQuery: "",
    }),
}));

export default useFilterStore;
