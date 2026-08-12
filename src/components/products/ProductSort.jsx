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
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
      >
        <option value="newest">جدیدترین</option>

        <option value="cheap">ارزان‌ترین</option>

        <option value="expensive">گران‌ترین</option>
      </select>
    </div>
  );
}
