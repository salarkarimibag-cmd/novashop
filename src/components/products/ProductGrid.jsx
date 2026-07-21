"use client";

import ProductCard from "@/components/home/Products/ProductCard";
import useFilterStore from "@/store/filterStore";

export default function ProductGrid({ products }) {
  const { selectedBrands, selectedCategories, sort, priceRange, searchQuery } =
    useFilterStore();

  let filteredProducts = [...products];

  const search = searchQuery.trim().toLowerCase();

  filteredProducts = filteredProducts.filter((product) => {
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;

    const searchMatch =
      !search ||
      product.title.toLowerCase().includes(search) ||
      product.brand?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search);

    return brandMatch && categoryMatch && priceMatch && searchMatch;
  });

  switch (sort) {
    case "cheap":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "expensive":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "newest":
    default:
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      {filteredProducts.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          محصولی پیدا نشد
        </p>
      )}
    </div>
  );
}
