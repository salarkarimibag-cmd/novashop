"use client";

import useFilterStore from "@/store/filterStore";
import useFilteredProducts from "@/hooks/useFilteredProducts";

export default function ProductSort() {
  const { sort, setSort } = useFilterStore();
  const filteredProducts = useFilteredProducts();

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="font-semibold">{filteredProducts.length} محصول</p>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border px-4 py-2"
      >
        <option value="newest">جدیدترین</option>
        <option value="cheap">ارزان‌ترین</option>
        <option value="expensive">گران‌ترین</option>
      </select>
    </div>
  );
}
