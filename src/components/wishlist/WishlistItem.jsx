"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";

export default function WishlistItem({ item }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemove = () => {
    removeFromWishlist(item.id);
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center">
      <Link
        href={`/products/${item.id}`}
        className="flex shrink-0 justify-center"
      >
        <Image
          src={item.image}
          alt={item.title}
          width={120}
          height={120}
          className="rounded-xl object-contain"
        />
      </Link>

      <div className="flex-1">
        <Link href={`/products/${item.id}`}>
          <h2 className="text-lg font-bold transition hover:text-blue-600">
            {item.title}
          </h2>
        </Link>

        {item.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {item.description}
          </p>
        )}

        <p className="mt-4 text-lg font-bold text-red-600">
          {item.price.toLocaleString()} تومان
        </p>
      </div>

      <div className="flex flex-col gap-3 md:w-48">
        <Button onClick={handleAddToCart} className="w-full">
          افزودن به سبد خرید
        </Button>

        <Button variant="outline" onClick={handleRemove} className="w-full">
          حذف از علاقه‌مندی
        </Button>
      </div>
    </div>
  );
}
