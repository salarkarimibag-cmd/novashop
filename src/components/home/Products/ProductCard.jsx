"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { useCartStore } from "@/store";
import useWishlistStore from "@/store/wishlistStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  // Normalize MongoDB product
  const normalizedProduct = {
    ...product,
    id: product._id,
    image: product.images?.[0] || "/images/placeholder.png",
  };

  const isInCart = items.some((item) => item.id === normalizedProduct.id);

  const liked = isInWishlist(normalizedProduct.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeFromWishlist(normalizedProduct.id);

      toast.error("از علاقه‌مندی‌ها حذف شد");
    } else {
      addToWishlist(normalizedProduct);

      toast.success("به علاقه‌مندی‌ها اضافه شد");
    }
  };

  const handleAddToCart = () => {
    addToCart(normalizedProduct);

    toast.success("محصول به سبد خرید اضافه شد", {
      description: product.title,
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/products/${normalizedProduct.id}`}>
          <Image
            src={normalizedProduct.image}
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
              ? "scale-110 text-red-500"
              : "text-gray-400 hover:scale-110 hover:text-red-500"
          }`}
        >
          <FaHeart size={18} />
        </button>

        {/* Discount */}

        {product.discountPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            تخفیف
          </span>
        )}
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${normalizedProduct.id}`}>
          <h3 className="line-clamp-2 min-h-14 text-base font-semibold transition-colors hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}

        {product.rating > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <FaStar className="text-amber-400" />

            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
        )}

        {/* Price */}

        <div className="mt-4">
          {product.discountPrice && (
            <p className="text-sm text-gray-400 line-through">
              {product.price.toLocaleString("fa-IR")} تومان
            </p>
          )}

          <p className="text-xl font-bold text-indigo-600">
            {(product.discountPrice || product.price).toLocaleString("fa-IR")}{" "}
            تومان
          </p>
        </div>

        {/* Cart Button */}

        <div className="mt-auto pt-5">
          {product.stock > 0 ? (
            <Button
              onClick={handleAddToCart}
              variant={isInCart ? "success" : "default"}
              className="w-full"
            >
              <FaShoppingCart />

              {isInCart ? "✓ به سبد خرید اضافه شد" : "افزودن به سبد خرید"}
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
