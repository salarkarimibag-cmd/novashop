"use client";

import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function OfferCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const productId = String(product._id);

  const image = getProductImage(product);

  const percent = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100,
  );

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast.error("این محصول موجود نیست");

      return;
    }

    try {
      await addItem(productId, 1);

      toast.success("محصول به سبد خرید اضافه شد", {
        description: product.title,
      });
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Link
          href={`/products/${productId}`}
          className="relative block h-full w-full"
        >
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
          %{percent}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <Link href={`/products/${productId}`}>
          <h3 className="font-semibold transition-colors hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>

        <div>
          <p className="text-sm text-gray-400 line-through">
            {formatPrice(product.price)}
          </p>

          <p className="text-xl font-bold text-indigo-600">
            {formatPrice(product.discountPrice)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"
        >
          <FaShoppingCart />
          خرید
        </button>
      </div>
    </div>
  );
}
