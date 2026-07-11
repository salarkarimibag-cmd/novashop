"use client";

import ProductCard from "@/components/home/Products/ProductCard";
import useFilteredProducts from "@/hooks/useFilteredProducts";

export default function ProductGrid() {
  const filteredProducts = useFilteredProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
