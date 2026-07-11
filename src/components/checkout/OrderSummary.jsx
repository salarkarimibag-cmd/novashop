"use client";

import useCart from "@/hooks/useCart";
import useCheckoutStore from "@/store/checkoutStore";
import { SHIPPING_PRICES } from "@/constants/shipping";

export default function OrderSummary() {
  const { items } = useCart();

  const { shippingMethod } = useCheckoutStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = SHIPPING_PRICES[shippingMethod] ?? 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

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
          <span>{subtotal.toLocaleString()} تومان</span>
        </div>

        <div className="flex justify-between">
          <span>هزینه ارسال</span>

          <span>
            {shipping === 0 ? "رایگان" : `${shipping.toLocaleString()} تومان`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>تخفیف</span>

          <span>{discount.toLocaleString()} تومان</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ قابل پرداخت</span>

          <span>{total.toLocaleString()} تومان</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-black py-3 text-white transition hover:bg-gray-800">
        ثبت سفارش
      </button>
    </div>
  );
}
