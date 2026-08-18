"use client";

import { ORDER_STATUS } from "@/constants/orderStatus";

export default function OrderStatus({ order }) {
  const status = order.status || "pending";

  return (
    <div className="mt-5">
      <h3 className="mb-3 font-bold">وضعیت سفارش</h3>

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-3
          text-center
          font-semibold
          dark:border-gray-800
          dark:bg-gray-800
        "
      >
        {ORDER_STATUS[status]?.title || "نامشخص"}
      </div>
    </div>
  );
}
