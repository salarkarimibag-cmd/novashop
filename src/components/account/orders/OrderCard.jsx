"use client";

import Link from "next/link";

import { ORDER_STATUS } from "@/constants/orderStatus";
import formatPrice from "@/lib/formatPrice";
import formatAddress from "@/lib/formatAddress";

export default function OrderCard({ order }) {
  const status = order.status || "pending";

  const orderId = order._id || order.id;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-bold text-lg">
            سفارش #{String(orderId).slice(-8)}
          </h2>

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
              text-yellow-700
            "
          >
            {ORDER_STATUS[status]?.title || "در انتظار بررسی"}
          </span>

          <Link
            href={`/account/orders/${orderId}`}
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
        {order.items?.length > 0 ? (
          order.items.map((item) => (
            <div
              key={
                item.product?._id ||
                item.product ||
                item._id ||
                `${item.title}-${item.quantity}`
              }
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
                <p className="font-medium">
                  {item.product?.title || item.title || "محصول حذف شده"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  تعداد: {item.quantity}
                </p>

                {item.selectedColor && (
                  <p className="mt-1 text-xs text-gray-500">
                    رنگ: {item.selectedColor}
                  </p>
                )}

                {item.selectedSize && (
                  <p className="mt-1 text-xs text-gray-500">
                    سایز: {item.selectedSize}
                  </p>
                )}
              </div>

              <span className="font-semibold">
                {formatPrice(
                  (item.price || item.product?.price || 0) * item.quantity,
                )}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">اطلاعات کالاهای سفارش موجود نیست.</p>
        )}
      </div>

      {/* Total */}
      <div
        className="
          mt-5
          flex
          justify-between
          border-t
          pt-5
          font-bold
        "
      >
        <span>مبلغ نهایی</span>

        <span>{formatPrice(order.totalPrice || order.total || 0)}</span>
      </div>

      {/* Address */}
      {order.address && (
        <div
          className="
            mt-5
            rounded-xl
            bg-gray-50
            p-4
            text-sm
            text-gray-600
          "
        >
          <p>گیرنده: {order.address.fullName}</p>

          <p className="mt-2">شماره تماس: {order.address.phone}</p>

          <p className="mt-2">
            آدرس: {order.address.province}
            {" - "}
            {order.address.city}
            <br />
            {formatAddress(order.address)}
          </p>
        </div>
      )}
    </div>
  );
}
