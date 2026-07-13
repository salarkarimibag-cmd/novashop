"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import Button from "@/components/ui/Button";

import { useCartStore, useWishlistStore } from "@/store";

export default function WishlistItem({ item }) {
  const addToCart = useCartStore((state) => state.addItem);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const handleAddToCart = () => {
    addToCart(item);

    toast.success("محصول به سبد خرید اضافه شد", {
      description: item.title,
    });
  };

  const handleRemove = () => {
    removeFromWishlist(item.id);

    toast.error("محصول از علاقه‌مندی‌ها حذف شد");
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center">
      {/* Image */}
      <Link
        href={`/products/${item.id}`}
        className="flex shrink-0 justify-center"
      >
        <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="128px"
            className="object-contain p-2"
          />
        </div>
      </Link>

      {/* Content */}
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
          {item.price?.toLocaleString()} تومان
        </p>
      </div>

      {/* Actions */}
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
