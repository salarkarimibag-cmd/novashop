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

  // استخراج صحیح شناسه محصول
  const productId =
    typeof item.id === "object" ? item.id._id : item._id || item.id;

  // افزودن به سبد خرید
  const handleAddToCart = async () => {
    try {
      await addToCart(String(productId), 1);

      toast.success("محصول به سبد خرید اضافه شد", {
        description: item.title,
      });
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
    }
  };

  // حذف از علاقه‌مندی
  const handleRemove = () => {
    removeFromWishlist(String(productId));

    toast.error("محصول از علاقه‌مندی‌ها حذف شد");
  };

  return (
    <div
      className="
      flex flex-col gap-5
      rounded-2xl border border-gray-200
      bg-white p-5 shadow-sm
      transition hover:shadow-md
      md:flex-row md:items-center
      "
    >
      {/* Image */}
      <Link
        href={`/products/${productId}`}
        className="flex shrink-0 justify-center"
      >
        <div
          className="
          relative h-32 w-32
          overflow-hidden rounded-xl
          bg-gray-50
          "
        >
          <Image
            src={item.image || item.images?.[0] || "/placeholder.png"}
            alt={item.title || "product"}
            fill
            sizes="(max-width:768px) 96px,128px"
            className="object-contain p-2"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1">
        <Link href={`/products/${productId}`}>
          <h2
            className="
            text-lg font-bold
            transition hover:text-blue-600
            "
          >
            {item.title}
          </h2>
        </Link>

        {item.description && (
          <p
            className="
            mt-2 line-clamp-2
            text-sm text-gray-500
            "
          >
            {item.description}
          </p>
        )}

        <p className="mt-4 text-lg font-bold text-red-600">
          {item.price?.toLocaleString("fa-IR")} تومان
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
