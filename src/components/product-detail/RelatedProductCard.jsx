import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function RelatedProductCard({ product }) {
  const image =
    product.images?.[0] || product.image || "/images/placeholder.png";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
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
          {(product.discountPrice || product.price).toLocaleString("fa-IR")}{" "}
          تومان
        </p>
      </div>
    </Link>
  );
}
