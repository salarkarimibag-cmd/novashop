"use client";

import { useParams } from "next/navigation";
import useOrderStore from "@/store/orderStore";
import Link from "next/link";
import OrderTimeline from "@/components/orders/OrderTimeline";
import OrderStatus from "@/components/orders/OrderStatus";
import { ORDER_STATUS } from "@/constants/orderStatus";
export default function OrderDetailPage() {
  const { id } = useParams();
  const orders = useOrderStore((state) => state.orders);
  const order = orders.find((order) => order.id.toString() === id);

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="rounded-2xl border bg-white p-8 text-center">
          <h1 className="text-xl font-bold">سفارش پیدا نشد</h1>

          <Link
            href="/orders"
            className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-white"
          >
            بازگشت به سفارش‌ها
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">جزئیات سفارش #{order.id}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* محصولات */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-xl font-bold">کالاهای سفارش</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    تعداد: {item.quantity}
                  </p>
                </div>

                <span className="font-bold">
                  {(item.price * item.quantity).toLocaleString()} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t pt-5 text-lg font-bold">
            <span>مبلغ نهایی</span>

            <span>{order.total.toLocaleString()} تومان</span>
          </div>
        </section>

        {/* اطلاعات سفارش */}
        <aside className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold">وضعیت سفارش</h2>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm">
                {ORDER_STATUS[order.status || "pending"]?.title}
              </span>
            </div>

            <OrderTimeline status={order.status || "pending"} />

            <OrderStatus order={order} />
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold">اطلاعات ارسال</h2>

            <p>{order.shippingAddress.fullName}</p>

            <p className="mt-2 text-gray-500">{order.shippingAddress.phone}</p>

            <p className="mt-3 text-sm">
              {order.shippingAddress.province} - {order.shippingAddress.city}
            </p>

            <p className="mt-2 text-sm">{order.shippingAddress.address}</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold">روش پرداخت</h2>

            <p>
              {order.paymentMethod === "online"
                ? "پرداخت آنلاین"
                : "پرداخت در محل"}
            </p>
          </div>
        </aside>
      </div>

      <Link
        href="/orders"
        className="mt-8 inline-block rounded-xl border px-5 py-3 hover:bg-gray-50"
      >
        بازگشت به سفارش‌ها
      </Link>
    </main>
  );
}
