"use client";

import useOrderStore from "@/store/orderStore";
import OrderCard from "@/components/orders/OrderCard";

export default function AccountOrders() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">سفارش‌های من</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">سفارشی ندارید</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
