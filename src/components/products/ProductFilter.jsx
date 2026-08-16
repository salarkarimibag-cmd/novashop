"use client";

import useProductFilters from "@/hooks/useProductFilters";
import { MIN_PRICE, MAX_PRICE } from "@/lib/productFilters";
import formatPrice from "@/lib/formatPrice";
import PriceRangeSlider from "./PriceRangeSlider";

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export default function ProductFilter({ brands = [], categories = [] }) {
  const { filters, applyFilters } = useProductFilters();

  // commit فقط یک‌بار در لحظه‌ی رهاکردن اجرا می‌شود (نه در هر تیکِ کشیدن)،
  // پس push پیش‌فرض کافی است؛ replace رکورد فعلی تاریخچه را جایگزین می‌کرد
  // و فیلتر قبلی (مثلاً برند) را از تاریخچه پاک می‌کرد.
  const commitPrice = ({ min, max }) => {
    applyFilters({
      minPrice: min === MIN_PRICE ? null : min,
      maxPrice: max === MAX_PRICE ? null : max,
    });
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

        <PriceRangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500000}
          value={{ min: filters.minPrice, max: filters.maxPrice }}
          onCommit={commitPrice}
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
          <span>حداقل: {formatPrice(filters.minPrice)}</span>

          <span>حداکثر: {formatPrice(filters.maxPrice)}</span>
        </div>
      </div>
    </aside>
  );
}
