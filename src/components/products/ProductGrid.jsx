"use client";

import products from "@/data/products";
import ProductCard from "@/components/home/Products/ProductCard";
import useFilterStore from "@/store/filterStore";

export default function ProductGrid() {
  const { selectedBrands, sort } = useFilterStore();

  let filteredProducts =
    selectedBrands.length === 0
      ? [...products]
      : products.filter((product) => selectedBrands.includes(product.brand));

  switch (sort) {
    case "cheap":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "expensive":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "newest":
    default:
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
