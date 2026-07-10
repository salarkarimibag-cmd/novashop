"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <ShoppingCart size={40} className="text-gray-400" />
      </div>

      <h3 className="text-xl font-bold">سبد خرید شما خالی است</h3>

      <p className="mt-3 text-sm leading-7 text-gray-500">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید.
      </p>

      <Link
        href="/products"
        className="mt-8 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        مشاهده محصولات
      </Link>
    </div>
  );
}
