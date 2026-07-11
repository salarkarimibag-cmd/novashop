"use client";

import Link from "next/link";
import { ORDER_STATUS } from "@/constants/orderStatus";

export default function OrderCard({ order }) {
  const status = order.status || "pending";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-bold">سفارش #{order.id}</h2>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm">
            {ORDER_STATUS[status]?.title}
          </span>

          <Link
            href={`/orders/${order.id}`}
            className="rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div>
              <p className="font-medium">{item.name}</p>

              <p className="text-sm text-gray-500">تعداد: {item.quantity}</p>
            </div>

            <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-5 font-bold">
        <span>مبلغ پرداختی</span>

        <span>{order.total.toLocaleString()} تومان</span>
      </div>

      <div className="mt-5 text-sm text-gray-500">
        <p>گیرنده: {order.shippingAddress?.fullName}</p>

        <p className="mt-1">{order.shippingAddress?.address}</p>
      </div>
    </div>
  );
}
