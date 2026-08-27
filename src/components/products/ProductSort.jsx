"use client";

import useProductFilters from "@/hooks/useProductFilters";
import { DEFAULT_SORT } from "@/lib/productFilters";

export default function ProductSort() {
  const { filters, applyFilters } = useProductFilters();

  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-bold">محصولات</h2>

      <select
        value={filters.sort}
        onChange={(e) =>
          // ترتیب پیش‌فرض پارامتری در URL نمی‌گذارد
          applyFilters({
            sort: e.target.value === DEFAULT_SORT ? null : e.target.value,
          })
        }
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="newest">جدیدترین</option>

        <option value="price_asc">ارزان‌ترین</option>

        <option value="price_desc">گران‌ترین</option>
      </select>
    </div>
  );
}
