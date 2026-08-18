"use client";

import useCartStore, { selectTotalQuantity } from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";

export default function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice);

  const totalItems = useCartStore(selectTotalQuantity);

  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <h2
        className="
          mb-5
          text-xl
          font-bold
        "
      >
        خلاصه سبد خرید
      </h2>

      <div
        className="
          mb-3
          flex
          justify-between
          text-gray-600
          dark:text-gray-400
        "
      >
        <span>تعداد کالا</span>

        <span>{totalItems}</span>
      </div>

      <div
        className="
          mb-5
          flex
          justify-between
          font-bold
        "
      >
        <span>مبلغ کل</span>

        <span>{formatPrice(totalPrice || 0)}</span>
      </div>

      <Link
        href="/checkout"
        className="
          block
          w-full
          rounded-xl
          bg-red-600
          py-3
          text-center
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
      >
        ادامه خرید
      </Link>
    </div>
  );
}
