"use client";

import brands from "@/data/brands";
import categories from "@/data/categories";

import useFilterStore from "@/store/filterStore";

export default function ProductFilter() {
  const {
    selectedBrands,
    selectedCategories,
    priceRange,

    toggleBrand,
    toggleCategory,

    setPriceRange,
    clearFilters,
  } = useFilterStore();

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
              key={brand.id}
              className="
              flex
              cursor-pointer
              items-center
              gap-3
              "
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="
                h-4
                w-4
                accent-black
                "
              />

              <span>{brand.name}</span>
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
              key={category.id}
              className="
              flex
              cursor-pointer
              items-center
              gap-3
              "
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.title)}
                onChange={() => toggleCategory(category.title)}
                className="
                h-4
                w-4
                accent-black
                "
              />

              <span>{category.title}</span>
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
          max="100000000"
          step="500000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
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
            حداقل: {priceRange[0].toLocaleString("fa-IR")}
            تومان
          </span>

          <span>
            حداکثر: {priceRange[1].toLocaleString("fa-IR")}
            تومان
          </span>
        </div>
      </div>
    </aside>
  );
}
