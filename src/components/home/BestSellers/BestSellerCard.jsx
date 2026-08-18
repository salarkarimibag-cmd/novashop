"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function BestSellerCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const productId = String(product._id);

  const liked = useWishlistStore((state) => state.isInWishlist(productId));

  const image = getProductImage(product);

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
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <Link href={`/products/${productId}`}>
          <Image
            src={image}
            alt={product.title}
            width={300}
            height={300}
            className="h-64 w-full object-cover transition group-hover:scale-105"
          />
        </Link>
      </div>

      <Link href={`/products/${productId}`}>
        <h3 className="mt-4 font-bold transition-colors hover:text-indigo-600">
          {product.title}
        </h3>
      </Link>

      <div className="my-2 flex">
        {Array.from({ length: product.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="font-bold">{formatPrice(product.price)}</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-2 text-white transition hover:opacity-80"
        >
          <ShoppingCart size={18} />
          خرید
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          className="rounded-xl border border-gray-200 p-2 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <Heart
            size={20}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-500 dark:text-gray-400"
            }
          />
        </button>
      </div>
    </div>
  );
}
