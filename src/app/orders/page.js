"use client";

import useOrderStore from "@/store/orderStore";
import { OrderCard } from "@/components/orders";

export default function OrdersPage() {
  const { orders } = useOrderStore();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">سفارش‌های من</h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
