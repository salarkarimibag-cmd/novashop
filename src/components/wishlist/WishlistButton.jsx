"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import useWishlistStore from "@/store/wishlistStore";

export default function WishlistButton() {
  const wishlist = useWishlistStore((state) => state.items || []);

  return (
    <Link
      href="/account/wishlist"
      className="relative rounded-lg border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      aria-label="علاقه‌مندی‌ها"
    >
      <Heart size={20} />

      {wishlist.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}
