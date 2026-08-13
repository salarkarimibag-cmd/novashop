"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";
import formatPrice from "@/lib/formatPrice";
import isNewProduct from "@/lib/isNewProduct";
import { getProductImage } from "@/constants/images";

export default function NewArrivalCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const productId = String(product._id || product.id);

  // خودِ نتیجه انتخاب می‌شود نه تابع، تا با تغییر لیست علاقه‌مندی‌ها
  // این کارت دوباره رندر شود
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
    <div className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        {isNewProduct(product) && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-xs text-white">
            جدید
          </span>
        )}

        <Link href={`/products/${productId}`}>
          <Image
            src={image}
            alt={product.title}
            width={300}
            height={300}
            className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-4">
        <Link href={`/products/${productId}`}>
          <h3 className="font-semibold transition-colors hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>

        <div className="my-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <Star
              key={item}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <p className="font-bold text-lg">{formatPrice(product.price)}</p>

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
            aria-label={
              liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
            }
            className="rounded-xl border p-2 transition hover:bg-gray-50"
          >
            <Heart
              size={20}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
