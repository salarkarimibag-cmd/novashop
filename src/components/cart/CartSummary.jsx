"use client";

import Link from "next/link";
import useCart from "@/hooks/useCart";

export default function CartSummary({ onClose }) {
  const { totalPrice, totalQuantity, items } = useCart();

  const shipping = totalPrice >= 500000 ? 0 : 50000;

  const finalPrice = totalPrice + shipping;

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const isEmpty = items.length === 0;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-500">تعداد کالا</span>

        <span className="font-semibold">{totalQuantity}</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-500">جمع کالاها</span>

        <span className="font-bold">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-500">هزینه ارسال</span>

        <span className="font-semibold">
          {shipping === 0
            ? "رایگان"
            : `${shipping.toLocaleString("fa-IR")} تومان`}
        </span>
      </div>

      <div className="mb-5 flex items-center justify-between border-t pt-4">
        <span className="font-semibold">مبلغ نهایی</span>

        <span className="text-xl font-bold text-indigo-600">
          {finalPrice.toLocaleString("fa-IR")} تومان
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
        href={isEmpty ? "#" : "/checkout"}
        onClick={(e) => {
          if (isEmpty) {
            e.preventDefault();
            return;
          }

          handleClick();
        }}
        className={`block w-full rounded-xl py-3 text-center text-white transition ${
          isEmpty
            ? "cursor-not-allowed bg-gray-300"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        ادامه فرآیند خرید
      </Link>
    </div>
  );
}
