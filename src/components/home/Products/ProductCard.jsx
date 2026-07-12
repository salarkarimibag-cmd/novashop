"use client";

import Image from "next/image";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

import useWishlistStore from "@/store/wishlistStore";

export default function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const liked = isInWishlist(product.id);

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={
            liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
          onClick={handleWishlist}
          className={`absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition-all duration-300 ${
            liked
              ? "scale-110 text-red-500"
              : "text-gray-400 hover:scale-110 hover:text-red-500"
          }`}
        >
          <FaHeart size={18} className={liked ? "fill-current" : ""} />
        </button>

        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          %{product.discount}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>

        <div className="flex items-center gap-1 text-amber-500">
          <FaStar />

          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-400 line-through">
            {product.oldPrice.toLocaleString()} تومان
          </p>

          <p className="text-xl font-bold text-indigo-600">
            {product.price.toLocaleString()} تومان
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">
          <FaShoppingCart />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
