"use client";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";

export default function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice);

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-xl border p-5">
      <h2 className="mb-5 text-xl font-bold">خلاصه سبد خرید</h2>

      <div className="mb-3 flex justify-between">
        <span>تعداد کالا</span>

        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between font-bold">
        <span>مبلغ کل</span>

        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
