"use client";

import Image from "next/image";
import Link from "next/link";

export default function SearchItem({ product, onSelect }) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={onSelect}
      className="flex items-center gap-3 p-3 transition hover:bg-gray-50"
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="56px"
          className="object-contain p-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium">{product.title}</p>

        <p className="mt-1 text-sm font-bold text-indigo-600">
          {product.price.toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </Link>
  );
}
