"use client";

import Link from "next/link";

import useCart from "@/hooks/useCart";

export default function CartSummary() {
  const { totalPrice, totalQuantity } = useCart();

  return (
    <div className="border-t bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-gray-500">تعداد کالا</span>

        <span className="font-semibold">{totalQuantity}</span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <span className="text-gray-500">جمع کل</span>

        <span className="text-lg font-bold">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </span>
      </div>

      <Link
        href="/cart"
        className="mb-3 block rounded-xl bg-black py-3 text-center text-white transition hover:bg-gray-800"
      >
        مشاهده سبد خرید
      </Link>

      <button className="w-full rounded-xl border py-3 transition hover:bg-gray-100">
        ادامه فرآیند خرید
      </button>
    </div>
  );
}
