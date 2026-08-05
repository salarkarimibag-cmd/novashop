"use client";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";

export default function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice);

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
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
