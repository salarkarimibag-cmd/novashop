"use client";

import Link from "next/link";

import SearchItem from "./SearchItem";

export default function SearchDropdown({ products, loading, query, onSelect }) {
  if (!query) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {loading ? (
        <div className="p-5 text-center text-sm text-gray-500 dark:text-gray-400">
          در حال جستجو...
        </div>
      ) : products.length > 0 ? (
        <>
          {products.slice(0, 5).map((product) => (
            <SearchItem
              key={product._id}
              product={product}
              onSelect={onSelect}
            />
          ))}

          <Link
            href={`/products?search=${query}`}
            onClick={onSelect}
            className="block border-t border-gray-200 p-4 text-center font-semibold text-indigo-600 transition hover:bg-gray-50 dark:border-gray-800 dark:text-indigo-400 dark:hover:bg-gray-800"
          >
            مشاهده همه نتایج برای «{query}»
          </Link>
        </>
      ) : (
        <div className="p-5 text-center text-sm text-gray-500 dark:text-gray-400">
          محصولی پیدا نشد
        </div>
      )}
    </div>
  );
}
