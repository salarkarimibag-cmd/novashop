"use client";

import useFilterStore from "@/store/filterStore";

export default function ProductSort() {
  const { sort, setSort } = useFilterStore();

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="font-semibold">محصولات</p>

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
