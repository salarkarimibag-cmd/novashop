"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildFilterQuery, parseProductFilters } from "@/lib/productFilters";

/**
 * فیلترهای محصولات را از URL می‌خواند و تغییرشان را به URL می‌نویسد.
 *
 * منبع حقیقت، خودِ آدرس صفحه است — نه یک state جدا — تا نتیجه‌ی فیلترشده
 * لینک‌پذیر باشد و دکمه‌ی back مرورگر کار کند.
 */
export default function useProductFilters() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const filters = parseProductFilters(searchParams);

  const applyFilters = (changes, { replace = false } = {}) => {
    const query = buildFilterQuery(searchParams, changes);

    const url = query ? `${pathname}?${query}` : pathname;

    // scroll: false تا تغییر فیلتر صفحه را به بالا پرت نکند
    if (replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  return {
    filters,
    applyFilters,
  };
}
