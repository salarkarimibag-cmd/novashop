"use client";

import useCart from "@/hooks/useCart";

export default function OrderSummary() {
  const { items } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = totalPrice > 5000000 ? 0 : 150000;

  const finalPrice = totalPrice + shipping;

  return (
    <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">خلاصه سفارش</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>تعداد کالا</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>جمع خرید</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>

        <div className="flex justify-between">
          <span>هزینه ارسال</span>

          <span>
            {shipping === 0 ? "رایگان" : `${shipping.toLocaleString()} تومان`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ قابل پرداخت</span>

          <span>{finalPrice.toLocaleString()} تومان</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-black py-3 text-white transition hover:bg-gray-800">
        ثبت سفارش
      </button>
    </div>
  );
}
