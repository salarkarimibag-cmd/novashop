"use client";

import { WishlistList } from "@/components/wishlist";

export default function WishlistPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">علاقه‌مندی‌های من</h1>

          <p className="mt-2 text-gray-500">
            محصولاتی که برای خرید در آینده ذخیره کرده‌اید.
          </p>
        </div>
      </div>

      <WishlistList />
    </main>
  );
}
