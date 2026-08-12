"use client";

import { Truck } from "lucide-react";

import useCart from "@/hooks/useCart";
import formatPrice from "@/lib/formatPrice";
import {
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING_COST,
  getShippingCost,
} from "@/constants/shipping";

// فروشگاه فقط یک روش ارسال دارد، پس اینجا چیزی برای انتخاب کردن نیست.
// این بخش صرفاً هزینه‌ی واقعیِ همین سفارش را توضیح می‌دهد؛ همان عددی که
// در «خلاصه سفارش» می‌آید و بک‌اند هم دقیقاً همان را حساب می‌کند.
export default function ShippingInfo() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingCost = getShippingCost(subtotal);

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">روش ارسال</h2>

      <div className="flex items-center justify-between rounded-xl border p-4">
        <div className="flex items-center gap-4">
          <Truck size={22} />

          <div>
            <p className="font-semibold">ارسال عادی</p>

            <p className="text-sm text-gray-500">۳ تا ۵ روز کاری</p>
          </div>
        </div>

        <span className="font-bold">
          {shippingCost === 0 ? "رایگان" : formatPrice(shippingCost)}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {shippingCost === 0
          ? `ارسال این سفارش رایگان است، چون مبلغ خرید از ${formatPrice(
              FREE_SHIPPING_THRESHOLD,
            )} بیشتر شده است.`
          : `هزینه ارسال ${formatPrice(
              FLAT_SHIPPING_COST,
            )} است. با ${formatPrice(remaining)} خرید بیشتر، ارسال رایگان می‌شود.`}
      </p>
    </div>
  );
}
