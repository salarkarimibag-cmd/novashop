"use client";

import Link from "next/link";

import useCart from "@/hooks/useCart";

export default function CartSummary({ onClose }) {
  const { totalPrice, totalQuantity } = useCart();
  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
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
        onClick={handleClick}
        className="mb-3 block rounded-xl bg-black py-3 text-center text-white transition hover:bg-gray-800"
      >
        مشاهده سبد خرید
      </Link>

      <Link
        href="/checkout"
        onClick={handleClick}
        className="block w-full rounded-xl bg-indigo-600 py-3 text-center text-white transition hover:bg-indigo-700"
      >
        ادامه فرآیند خرید
      </Link>
    </div>
  );
}
