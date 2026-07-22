"use client";

import ProductCard from "@/components/home/Products/ProductCard";
import useFilterStore from "@/store/filterStore";

export default function ProductGrid({ products = [] }) {
  const selectedBrands = useFilterStore((state) => state.selectedBrands);

  const selectedCategories = useFilterStore(
    (state) => state.selectedCategories,
  );

  const sort = useFilterStore((state) => state.sort);

  const priceRange = useFilterStore((state) => state.priceRange);

  const searchQuery = useFilterStore((state) => state.searchQuery);

  let filteredProducts = [...products];

  // =====================
  // Search
  // =====================

  if (searchQuery.trim()) {
    const search = searchQuery.trim().toLowerCase();

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search),
    );
  }

  // =====================
  // Brand
  // =====================

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.brand),
    );
  }

  // =====================
  // Category
  // =====================

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category),
    );
  }

  // =====================
  // Price
  // =====================

  filteredProducts = filteredProducts.filter((product) => {
    const price = product.discountPrice || product.price || 0;

    return price >= priceRange[0] && price <= priceRange[1];
  });

  // =====================
  // Sort
  // =====================

  if (sort === "cheap") {
    filteredProducts.sort(
      (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
    );
  }

  if (sort === "expensive") {
    filteredProducts.sort(
      (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
    );
  }

  if (sort === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }

  // Empty

  if (filteredProducts.length === 0) {
    return (
      <div
        className="
      rounded-2xl
      border
      bg-white
      p-10
      text-center
      text-gray-500
      "
      >
        محصولی پیدا نشد
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      "
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id || product._id} product={product} />
      ))}
    </div>
  );
}
