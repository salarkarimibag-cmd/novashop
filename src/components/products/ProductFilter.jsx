"use client";

import Image from "next/image";
import brands from "@/data/brands";
import categories from "@/data/categories";
import useFilterStore from "@/store/filterStore";

export default function ProductFilter() {
  const {
    selectedBrands,
    selectedCategories,
    toggleBrand,
    toggleCategory,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">فیلتر محصولات</h3>

        <button
          onClick={resetFilters}
          className="text-sm text-indigo-600 hover:underline"
        >
          حذف فیلترها
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="mb-3 font-semibold">دسته‌بندی</h4>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.title)}
                onChange={() => toggleCategory(category.title)}
                className="h-4 w-4 accent-black"
              />

              <span>{category.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h4 className="mb-3 font-semibold">برند</h4>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="h-4 w-4 accent-black"
              />

              <Image
                src={brand.logo}
                alt={brand.name}
                width={28}
                height={28}
                className="object-contain"
              />

              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="mb-3 font-semibold">محدوده قیمت</h4>

        <div className="space-y-3">
          <input
            type="number"
            placeholder="حداقل قیمت"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange(Number(e.target.value) || 0, priceRange.max)
            }
            className="w-full rounded-lg border p-2 outline-none focus:border-indigo-500"
          />

          <input
            type="number"
            placeholder="حداکثر قیمت"
            value={priceRange.max === Infinity ? "" : priceRange.max}
            onChange={(e) =>
              setPriceRange(
                priceRange.min,
                e.target.value === "" ? Infinity : Number(e.target.value),
              )
            }
            className="w-full rounded-lg border p-2 outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
