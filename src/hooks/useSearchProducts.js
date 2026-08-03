"use client";

import { useState } from "react";
import { getProducts } from "@/services/productService";

export default function useSearchProducts() {
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const searchProducts = async (query) => {
    if (!query?.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const result = await getProducts({
        search: query,
      });

      setResults(result.products || []);
    } catch (error) {
      console.error("Search products error:", error);

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    searchProducts,
  };
}
