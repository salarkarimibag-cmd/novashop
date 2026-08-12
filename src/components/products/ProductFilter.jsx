"use client";

import { useState } from "react";

import useProductFilters from "@/hooks/useProductFilters";
import { MAX_PRICE } from "@/lib/productFilters";

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export default function ProductFilter({ brands = [], categories = [] }) {
  const { filters, applyFilters } = useProductFilters();

  // اسلایدر باید هنگام کشیدن روان حرکت کند، پس مقدارش محلی نگه داشته می‌شود
  // و فقط موقع رها کردن به URL می‌رود
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  const [urlPrice, setUrlPrice] = useState(filters.maxPrice);

  // اگر URL از بیرون عوض شود (دکمه‌ی back یا «حذف همه»)، اسلایدر باید همراهش بیاید.
  // تنظیم state هنگام رندر — الگوی رسمی ری‌اکت برای همگام‌سازی با props
  if (filters.maxPrice !== urlPrice) {
    setUrlPrice(filters.maxPrice);

    setMaxPrice(filters.maxPrice);
  }

  const commitPrice = () => {
    if (maxPrice === filters.maxPrice) return;

    // در بیشترین مقدار، پارامتر حذف می‌شود تا URL تمیز بماند
    applyFilters(
      { maxPrice: maxPrice === MAX_PRICE ? null : maxPrice },
      { replace: true },
    );
  };

  const clearFilters = () =>
    applyFilters({
      search: null,
      brand: null,
      category: null,
      minPrice: null,
      maxPrice: null,
      sort: null,
    });

  return (
    <aside
      className="
      rounded-2xl
      border
      bg-white
      p-5
      space-y-8
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">فیلتر محصولات</h2>

        <button
          onClick={clearFilters}
          className="
          text-sm
          text-red-500
          hover:text-red-700
          "
        >
          حذف همه
        </button>
      </div>

      {/* Brands */}

      <div>
        <h3 className="mb-4 font-semibold">برند</h3>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() =>
                  applyFilters({ brand: toggleValue(filters.brand, brand) })
                }
                className="h-4 w-4 accent-black"
              />

              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}

      <div>
        <h3 className="mb-4 font-semibold">دسته‌بندی</h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() =>
                  applyFilters({
                    category: toggleValue(filters.category, category),
                  })
                }
                className="h-4 w-4 accent-black"
              />

              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}

      <div>
        <h3 className="mb-4 font-semibold">محدوده قیمت</h3>

        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step="500000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          onPointerUp={commitPrice}
          onKeyUp={commitPrice}
          className="
          w-full
          accent-black
          "
        />

        <div
          className="
          mt-4
          flex
          justify-between
          text-sm
          text-gray-600
          "
        >
          <span>
            حداقل: {filters.minPrice.toLocaleString("fa-IR")}
            تومان
          </span>

          <span>
            حداکثر: {maxPrice.toLocaleString("fa-IR")}
            تومان
          </span>
        </div>
      </div>
    </aside>
  );
}
