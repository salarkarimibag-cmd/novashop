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
          bg-gray-50
          p-3
          text-center
          font-semibold
        "
      >
        {ORDER_STATUS[status]?.title || "نامشخص"}
      </div>
    </div>
  );
}
