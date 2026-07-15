"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import useOrderStore from "@/store/orderStore";

export default function OrderSuccessPage() {
  const orders = useOrderStore((state) => state.orders);

  const order = orders[orders.length - 1];

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div
          className="
          mx-auto
          max-w-xl
          rounded-2xl
          border
          bg-white
          p-8
          text-center
          shadow-sm
        "
        >
          <h1 className="text-xl font-bold">سفارشی پیدا نشد</h1>

          <Link
            href="/"
            className="
              mt-5
              inline-block
              rounded-xl
              bg-black
              px-5
              py-3
              text-white
            "
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
      min-h-screen
      bg-gray-50
      px-4
      py-10
    "
    >
      <div
        className="
        mx-auto
        max-w-2xl
        rounded-2xl
        border
        bg-white
        p-8
        text-center
        shadow-sm
      "
      >
        <CheckCircle size={80} className="mx-auto mb-5 text-green-500" />

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          سفارش شما ثبت شد 🎉
        </h1>

        <p
          className="
          mt-3
          text-gray-500
        "
        >
          از خرید شما در NovaShop متشکریم
        </p>

        <div
          className="
          mt-8
          space-y-4
          rounded-xl
          bg-gray-50
          p-5
          text-right
        "
        >
          <div className="flex justify-between">
            <span className="text-gray-500">شماره سفارش</span>

            <span className="font-bold">{String(order.id).slice(0, 8)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">تعداد کالا</span>

            <span className="font-bold">
              {order.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div
            className="
            flex
            justify-between
            border-t
            pt-4
            font-bold
          "
          >
            <span>مبلغ پرداختی</span>

            <span>{order.total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>

        <div
          className="
          mt-8
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:justify-center
        "
        >
          <Link
            href={`/orders/${order.id}`}
            className="
              rounded-xl
              bg-black
              px-6
              py-3
              text-white
              transition
              hover:bg-gray-800
            "
          >
            مشاهده جزئیات سفارش
          </Link>

          <Link
            href="/"
            className="
              rounded-xl
              border
              px-6
              py-3
              transition
              hover:bg-gray-50
            "
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </main>
  );
}
