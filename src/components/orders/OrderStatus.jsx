"use client";

import useOrderStore from "@/store/orderStore";

export default function OrderStatus({ order }) {
  const { updateOrderStatus } = useOrderStore();

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-bold">تغییر وضعیت سفارش</h2>

      <select
        value={order.status}
        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
        className="w-full rounded-xl border p-3"
      >
        <option value="pending">ثبت سفارش</option>

        <option value="paid">پرداخت موفق</option>

        <option value="preparing">آماده‌سازی کالا</option>

        <option value="shipped">ارسال شده</option>

        <option value="delivered">تحویل داده شد</option>
      </select>
    </div>
  );
}
