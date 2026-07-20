"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import useOrderStore from "@/store/orderStore";

export default function RecentOrders() {
  const orders = useOrderStore((state) => state.orders);

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">آخرین سفارش‌ها</h2>

        <Link
          href="/account/orders"
          className="text-sm text-blue-600 hover:underline"
        >
          مشاهده همه
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <ShoppingBag size={40} />

          <p className="mt-3">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">سفارش #{order.id}</p>

                <p className="text-sm text-gray-500">{order.status}</p>
              </div>

              <span className="font-bold">
                {order.total?.toLocaleString()} تومان
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
