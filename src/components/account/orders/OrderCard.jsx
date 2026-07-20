"use client";

import Link from "next/link";
import { ORDER_STATUS } from "@/constants/orderStatus";

export default function OrderCard({ order }) {
  const status = order.status || "pending";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-bold">سفارش #{String(order.id).slice(0, 8)}</h2>

          <p className="mt-1 text-sm text-gray-500">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("fa-IR")
              : "تاریخ نامشخص"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="
            rounded-full
            bg-yellow-100
            px-4
            py-2
            text-sm
          "
          >
            {ORDER_STATUS[status]?.title || "نامشخص"}
          </span>

          <Link
            href={`/orders/${order.id}`}
            className="
              rounded-xl
              bg-black
              px-5
              py-3
              text-white
              transition
              hover:bg-gray-800
            "
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
            className="
              flex
              flex-col
              gap-3
              border-b
              pb-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="font-medium">{item.title}</p>

              <p className="mt-1 text-sm text-gray-500">
                تعداد: {item.quantity}
              </p>

              {(item.selectedColor || item.selectedSize) && (
                <div className="mt-1 flex gap-3 text-xs text-gray-500">
                  {item.selectedColor && <span>رنگ: {item.selectedColor}</span>}

                  {item.selectedSize && <span>سایز: {item.selectedSize}</span>}
                </div>
              )}
            </div>

            <span className="font-semibold">
              {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        className="
        mt-5
        flex
        items-center
        justify-between
        border-t
        pt-5
        font-bold
      "
      >
        <span>مبلغ پرداختی</span>

        <span>{order.total.toLocaleString("fa-IR")} تومان</span>
      </div>

      {/* Address */}
      <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
        <p>گیرنده: {order.shippingAddress?.fullName}</p>

        <p className="mt-2">شماره تماس: {order.shippingAddress?.phone}</p>

        <p className="mt-2">آدرس: {order.shippingAddress?.address}</p>
      </div>
    </div>
  );
}
