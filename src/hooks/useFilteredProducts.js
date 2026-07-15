"use client";

import { useMemo } from "react";

import products from "@/data/products";
import useFilterStore from "@/store/filterStore";

export default function useFilteredProducts() {
  const { selectedBrands, selectedCategories, sort, priceRange, searchQuery } =
    useFilterStore();

  return useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const priceMatch =
        product.price >= priceRange.min && product.price <= priceRange.max;

      const searchMatch =
        !search ||
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      return brandMatch && categoryMatch && priceMatch && searchMatch;
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
  }, [selectedBrands, selectedCategories, sort, priceRange, searchQuery]);
}
