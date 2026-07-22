"use client";

import useFilterStore from "@/store/filterStore";

export default function ProductSort() {
  const sort = useFilterStore((state) => state.sort);
  const setSort = useFilterStore((state) => state.setSort);

  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-bold">محصولات</h2>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
      >
        <option value="newest">جدیدترین</option>

        <option value="cheap">ارزان‌ترین</option>

        <option value="expensive">گران‌ترین</option>
      </select>
    </div>
  );
}
