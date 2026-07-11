"use client";

import Image from "next/image";
import brands from "@/data/brands";
import categories from "@/data/categories";
import useFilterStore from "@/store/filterStore";

export default function ProductFilter() {
  const { selectedBrands, selectedCategories, toggleBrand, toggleCategory } =
    useFilterStore();

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-bold">فیلتر محصولات</h3>

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
      <div>
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
    </div>
  );
}
