"use client";

import Link from "next/link";

import WishlistItem from "./WishlistItem";

import useWishlistStore from "@/store/wishlistStore";

export default function WishlistList() {
  const items = useWishlistStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <div className="mb-4 text-6xl">❤️</div>

        <h2 className="mb-3 text-2xl font-bold">علاقه‌مندی‌های شما خالی است</h2>

        <p className="mb-8 text-gray-500">
          هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید.
        </p>

        <Link
          href="/products"
          className="inline-flex rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}
