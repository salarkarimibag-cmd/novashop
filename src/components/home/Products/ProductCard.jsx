"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store";
import useWishlistStore from "@/store/wishlistStore";
import { toast } from "sonner";
export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addItem);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const liked = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);

    toast.success("محصول به سبد خرید اضافه شد", {
      description: product.title,
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition-all duration-300 ${
            liked
              ? "text-red-500 scale-110"
              : "text-gray-400 hover:text-red-500 hover:scale-110"
          }`}
        >
          <FaHeart size={18} />
        </button>

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            %{product.discount}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-14 text-base font-semibold transition-colors hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <FaStar className="text-amber-400" />

            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-4">
          {product.oldPrice && (
            <p className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString()} تومان
            </p>
          )}

          <p className="text-xl font-bold text-indigo-600">
            {product.price.toLocaleString()} تومان
          </p>
        </div>

        {/* Button */}
        <div className="mt-auto pt-5">
          {product.inStock !== false ? (
            <Button onClick={handleAddToCart} className="w-full">
              <FaShoppingCart />
              افزودن به سبد خرید
            </Button>
          ) : (
            <Button disabled variant="secondary" className="w-full">
              ناموجود
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
