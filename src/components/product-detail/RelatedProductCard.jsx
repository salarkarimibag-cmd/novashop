import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { getProductImage } from "@/constants/images";
import formatPrice from "@/lib/formatPrice";

export default function RelatedProductCard({ product }) {
  const image = getProductImage(product);

  return (
    <Link
      href={`/products/${product._id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 font-semibold">{product.title}</h3>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" />

          <span>{product.rating || 0}</span>
        </div>

        <p className="text-lg font-bold text-red-600">
          {formatPrice(product.discountPrice || product.price)}
        </p>
      </div>
    </Link>
  );
}
