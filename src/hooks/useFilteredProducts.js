"use client";

import { useMemo } from "react";

import products from "@/data/products";
import useFilterStore from "@/store/filterStore";

export default function useFilteredProducts() {
  const { selectedBrands, selectedCategories, sort } = useFilterStore();

  return useMemo(() => {
    let filtered = products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return brandMatch && categoryMatch;
    });

    switch (sort) {
      case "cheap":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "expensive":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [selectedBrands, selectedCategories, sort]);
}
