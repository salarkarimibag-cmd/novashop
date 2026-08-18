"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import useOrders from "@/hooks/useOrders";
import Spinner from "@/components/ui/Spinner/Spinner";
import { ORDER_STATUS } from "@/constants/orderStatus";
import formatPrice from "@/lib/formatPrice";

export default function RecentOrders() {
  // useOrders خودش سفارش‌ها را از سرور می‌گیرد. خواندن مستقیم از استور،
  // فقط چیزی را نشان می‌داد که در localStorage مانده بود.
  const { orders, loading } = useOrders();

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">آخرین سفارش‌ها</h2>

        <Link
          href="/account/orders"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          مشاهده همه
        </Link>
      </div>

      {loading ? (
        <Spinner className="py-10" />
      ) : recentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
          <ShoppingBag size={40} />

          <p className="mt-3">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link
              key={order._id}
              href={`/account/orders/${order._id}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              <div>
                <p className="font-semibold">سفارش #{order._id}</p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ORDER_STATUS[order.status]?.title || "در انتظار بررسی"}
                </p>
              </div>

              <span className="font-bold">{formatPrice(order.totalPrice)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
