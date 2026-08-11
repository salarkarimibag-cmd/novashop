"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product._id),
  );

  const image = getProductImage(product);

  const handleAddToCart = async () => {
    try {
      await addItem(product._id, 1);

      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد");
    }
  };

  return (
    <div className="group rounded-2xl border bg-white p-4 transition hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={image}
          alt={product.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          onClick={() => toggleWishlist(product)}
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-white
            p-2
            shadow
          "
        >
          <Heart
            size={20}
            className={
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </button>
      </div>

      <Link href={`/products/${product._id}`}>
        <h3 className="mt-4 line-clamp-2 font-semibold">{product.title}</h3>
      </Link>

      <div className="mt-2 flex items-center gap-1 text-yellow-500">
        <Star size={16} fill="currentColor" />

        <span className="text-sm text-gray-600">{product.rating || 0}</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          {product.discountPrice ? (
            <>
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>

              <p className="font-bold text-red-600">
                {formatPrice(product.discountPrice)}
              </p>
            </>
          ) : (
            <p className="font-bold">{formatPrice(product.price)}</p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="
            rounded-xl
            bg-black
            p-3
            text-white
            transition
            hover:opacity-80
          "
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}
