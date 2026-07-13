"use client";

import { Truck, Zap, Package } from "lucide-react";

import useCheckoutStore from "@/store/checkoutStore";
import { SHIPPING_PRICES } from "@/constants/shipping";

export default function ShippingMethod() {
  const shippingMethod = useCheckoutStore((state) => state.shippingMethod);

  const setShippingMethod = useCheckoutStore(
    (state) => state.setShippingMethod,
  );

  const methods = [
    {
      id: "normal",
      title: "ارسال عادی",
      price: SHIPPING_PRICES.normal,
      icon: Truck,
      time: "۳ تا ۵ روز کاری",
    },

    {
      id: "express",
      title: "ارسال سریع",
      price: SHIPPING_PRICES.express,
      icon: Zap,
      time: "۱ تا ۲ روز کاری",
    },

    {
      id: "pickup",
      title: "تحویل حضوری",
      price: SHIPPING_PRICES.pickup,
      icon: Package,
      time: "امروز",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">روش ارسال</h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;

          const active = shippingMethod === method.id;

          return (
            <label
              key={method.id}
              className={`
                flex cursor-pointer items-center justify-between
                rounded-xl border p-4 transition
                ${active ? "border-black bg-gray-50" : "hover:border-gray-400"}
              `}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={active}
                  onChange={() => setShippingMethod(method.id)}
                  className="h-4 w-4 accent-black"
                />

                <Icon size={22} />

                <div>
                  <p className="font-semibold">{method.title}</p>

                  <p className="text-sm text-gray-500">{method.time}</p>
                </div>
              </div>

              <span className="font-bold">
                {method.price === 0
                  ? "رایگان"
                  : `${method.price.toLocaleString()} تومان`}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
