"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import useOrderStore from "@/store/orderStore";

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
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">سفارش پیدا نشد</h1>

          <Link
            href="/orders"
            className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            بازگشت به سفارش‌ها
          </Link>
        </div>
      </main>
    );
  }

  const paymentTitle =
    order.paymentMethod === "online"
      ? "پرداخت آنلاین"
      : order.paymentMethod === "cash"
        ? "پرداخت در محل"
        : "کارت به کارت";

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">جزئیات سفارش #{order.id}</h1>

        {order.createdAt && (
          <p className="text-sm text-gray-500">
            تاریخ سفارش: {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Products */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-xl font-bold">کالاهای سفارش</h2>

          <div className="space-y-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>

                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.title}</p>

                    <p className="mt-2 text-sm text-gray-500">
                      تعداد: {item.quantity}
                    </p>
                  </div>

                  <span className="font-bold">
                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t pt-5 text-lg font-bold">
            <span>مبلغ نهایی</span>

            <span>{order.total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </section>

        {/* Sidebar */}

        <aside className="space-y-6">
          {/* Status */}

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

          {/* Shipping */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold">اطلاعات ارسال</h2>

            <p className="font-medium">{order.shippingAddress?.fullName}</p>

            <p className="mt-2 text-gray-500">{order.shippingAddress?.phone}</p>

            <p className="mt-3 text-sm">
              {order.shippingAddress?.province}
              {" - "}
              {order.shippingAddress?.city}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              {order.shippingAddress?.address}
            </p>
          </div>

          {/* Payment */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold">روش پرداخت</h2>

            <p>{paymentTitle}</p>
          </div>
        </aside>
      </div>

      <Link
        href="/orders"
        className="mt-8 inline-block rounded-xl border px-5 py-3 transition hover:bg-gray-50"
      >
        بازگشت به سفارش‌ها
      </Link>
    </main>
  );
}
