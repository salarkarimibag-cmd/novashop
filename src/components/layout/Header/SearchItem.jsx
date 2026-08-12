import Image from "next/image";
import Link from "next/link";

import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function SearchItem({ product, onSelect }) {
  return (
    <Link
      href={`/products/${product._id}`}
      onClick={onSelect}
      className="flex items-center gap-4 border-b p-4 transition hover:bg-gray-50"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={getProductImage(product)}
          alt={product.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{product.title}</h3>

        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

        <p className="mt-2 text-sm font-bold text-red-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
