"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/services/productService";

export default function useSearchProducts(query) {
  const term = query?.trim() || "";

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!term) {
      return;
    }

    // با تغییر عبارت، جستجوی قبلی لغو می‌شود
    // تا نتیجه‌ی کهنه روی نتیجه‌ی تازه ننشیند
    const controller = new AbortController();

    const searchProducts = async () => {
      try {
        setLoading(true);

        const result = await getProducts(
          { search: term },
          { signal: controller.signal },
        );

        setResults(result.products || []);

        setLoading(false);
      } catch (error) {
        // لغو عمدی خطا نیست؛ جستجوی بعدی مسئول وضعیت است
        if (error.name === "AbortError") {
          return;
        }

        console.error("Search products error:", error);

        setResults([]);

        setLoading(false);
      }
    };

    searchProducts();

    return () => controller.abort();
  }, [term]);

  // با عبارت خالی چیزی برای نمایش نیست؛ محاسبه‌شده است، نه state جدا
  return {
    results: term ? results : [],
    loading: term ? loading : false,
  };
}
