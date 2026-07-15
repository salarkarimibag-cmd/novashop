"use client";

import { useMemo } from "react";
import products from "@/data/products";

export default function useSearchProducts(query) {
  return useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search),
    );
  }, [query]);
}
