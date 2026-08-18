"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useOrderStore from "@/store/orderStore";
import OrderTimeline from "@/components/account/orders/OrderTimeline";
import OrderStatus from "@/components/account/orders/OrderStatus";
import { ORDER_STATUS } from "@/constants/orderStatus";
import formatAddress from "@/lib/formatAddress";

export default function OrderDetailPage() {
  const { id } = useParams();

  const order = useOrderStore((state) => state.currentOrder);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  useEffect(() => {
    if (id) {
      fetchOrderById(id).catch(console.error);
    }
  }, [id, fetchOrderById]);

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow dark:bg-gray-900">
          <div className="animate-pulse space-y-5">
            <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-40 rounded-xl bg-gray-200 dark:bg-gray-800" />

            <div className="h-40 rounded-xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </main>
    );
  }

  const status = order.status || "pending";

  const paymentTitle =
    order.paymentMethod === "online"
      ? "پرداخت آنلاین"
      : order.paymentMethod === "cash"
        ? "پرداخت در محل"
        : "کارت به کارت";

  // فاکتور باید همان چیزی را نشان دهد که سرور ثبت کرده، نه چیزی که
  // فرانت دوباره حساب می‌کند؛ وگرنه جمع روی صفحه با مبلغ پرداختی نمی‌خواند.
  const subtotal =
    order.subtotal ??
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;

  const shipping = order.shippingCost ?? 0;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div
          className="
          mb-8
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-center
          md:justify-between
        "
        >
          <h1 className="text-3xl font-bold">
            جزئیات سفارش #{String(order._id).slice(-8)}
          </h1>

          {order.createdAt && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              تاریخ سفارش:{" "}
              {new Date(order.createdAt).toLocaleDateString("fa-IR")}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Products */}

          <section
            className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            lg:col-span-2
            dark:border-gray-800
            dark:bg-gray-900
            "
          >
            <h2 className="mb-6 text-xl font-bold">کالاهای سفارش</h2>

            <div className="space-y-5">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="
                  flex
                  gap-4
                  border-b
                  border-gray-200
                  pb-5
                  dark:border-gray-800
                  "
                >
                  <div
                    className="
                    relative
                    h-20
                    w-20
                    overflow-hidden
                    rounded-xl
                    bg-gray-100
                    dark:bg-gray-800
                    "
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title || "product"}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    )}
                  </div>

                  <div
                    className="
                    flex-1
                    "
                  >
                    <p className="font-semibold">
                      {item.title || item.product?.title || "محصول"}
                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      تعداد: {item.quantity}
                    </p>

                    <p className="mt-2 font-bold">
                      {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                      تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="
              mt-6
              space-y-3
              border-t
              border-gray-200
              pt-5
              dark:border-gray-800
            "
            >
              <div className="flex justify-between">
                <span>مبلغ کالاها</span>

                <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
              </div>

              <div className="flex justify-between">
                <span>هزینه ارسال</span>

                <span>
                  {shipping === 0
                    ? "رایگان"
                    : `${shipping.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                border-t
                border-gray-200
                pt-4
                text-lg
                font-bold
                dark:border-gray-800
              "
              >
                <span>مبلغ نهایی</span>

                <span>{order.totalPrice?.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
          </section>

          {/* Sidebar */}

          <aside className="space-y-6">
            <div
              className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
            >
              <h2 className="mb-5 font-bold">وضعیت سفارش</h2>

              <span
                className="
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-sm
                dark:bg-yellow-950/40
                dark:text-yellow-400
              "
              >
                {ORDER_STATUS[status]?.title}
              </span>

              <div className="mt-5">
                <OrderTimeline status={status} />
              </div>

              <OrderStatus order={order} />
            </div>

            <div
              className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
            >
              <h2 className="mb-4 font-bold">اطلاعات ارسال</h2>

              <p>{order.address?.fullName}</p>

              <p className="mt-2 text-gray-500 dark:text-gray-400">{order.address?.phone}</p>

              <p className="mt-3">
                {order.address?.province}
                {" - "}
                {order.address?.city}
              </p>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {formatAddress(order.address)}
              </p>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                کد پستی: {order.address?.postalCode}
              </p>

              <p className="mt-4 font-semibold">روش ارسال: ارسال عادی</p>
            </div>

            <div
              className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
            >
              <h2 className="mb-4 font-bold">روش پرداخت</h2>

              <p>{paymentTitle}</p>
            </div>
          </aside>
        </div>

        <Link
          href="/account/orders"
          className="
          mt-8
          inline-block
          rounded-xl
          border
          border-gray-200
          bg-white
          px-5
          py-3
          hover:bg-gray-50
          dark:border-gray-800
          dark:bg-gray-900
          dark:hover:bg-gray-800
          "
        >
          بازگشت به سفارش‌ها
        </Link>
      </div>
    </main>
  );
}
