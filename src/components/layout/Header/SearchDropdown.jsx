"use client";

import SearchItem from "./SearchItem";

export default function SearchDropdown({ products, query, onSelect }) {
  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {products.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
          {products.map((product) => (
            <SearchItem
              key={product.id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="p-5 text-center text-sm text-gray-500">
          محصولی پیدا نشد.
        </div>
      )}
    </div>
  );
}
