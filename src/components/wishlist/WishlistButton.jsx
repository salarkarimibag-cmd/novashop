"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import useWishlistStore from "@/store/wishlistStore";

export default function WishlistButton() {
  const wishlist = useWishlistStore((state) => state.items || []);

  return (
    <Link
      href="/wishlist"
      className="relative rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
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
