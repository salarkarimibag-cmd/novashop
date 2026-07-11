"use client";

import Image from "next/image";
import useCart from "@/hooks/useCart";

export default function OrderItems() {
  const { items } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center text-gray-400">
        سبد خرید خالی است.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">محصولات سفارش</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="
            flex
            items-center
            gap-4
            border-b
            pb-4
            last:border-none
            "
          >
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="
              rounded-xl
              object-cover
              "
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-1 text-sm text-gray-500">
                تعداد: {item.quantity}
              </p>
            </div>

            <div className="font-bold">
              {(item.price * item.quantity).toLocaleString()} تومان
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
