"use client";

import { OrderCard } from "@/components/orders";
import useOrders from "@/hooks/useOrders";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">سفارش‌های من</h1>

        {orders.length === 0 ? (
          <div
            className="
            rounded-2xl
            border
            bg-white
            p-8
            text-center
            shadow-sm
          "
          >
            <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
