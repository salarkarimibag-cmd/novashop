"use client";

import brands from "@/data/brands";
import Image from "next/image";
import useFilterStore from "@/store/filterStore";
export default function ProductFilter() {
  const { selectedBrands, toggleBrand } = useFilterStore();
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-bold">فیلتر محصولات</h3>

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
