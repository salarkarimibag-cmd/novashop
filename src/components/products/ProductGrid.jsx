"use client";
import ProductCard from "@/components/products/ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-10
          text-center
          text-gray-500
          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-400
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
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
