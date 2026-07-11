"use client";

import { Truck, Zap, Package } from "lucide-react";
import useCheckoutStore from "@/store/checkoutStore";
import { SHIPPING_PRICES } from "@/constants/shipping";
export default function ShippingMethod() {
  const { shippingMethod, setShippingMethod } = useCheckoutStore();

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
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">روش ارسال</h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                shippingMethod === method.id
                  ? "border-black bg-gray-50"
                  : "hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === method.id}
                  onChange={() => setShippingMethod(method.id)}
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
