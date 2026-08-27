"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Skeleton from "@/components/ui/Skeleton";
import { useHydration } from "@/components/providers/HydrationProvider";
import useOrderStore from "@/store/orderStore";
import formatPrice from "@/lib/formatPrice";

function OrderSuccessSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow dark:bg-gray-900">
        <div className="space-y-6">
          <Skeleton className="mx-auto h-20 w-20 rounded-full" />

          <Skeleton className="mx-auto h-8 w-64" />

          <Skeleton className="mx-auto h-4 w-80" />

          <div className="space-y-5 rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <Skeleton className="h-6 w-44" />
            </div>
          </div>

          <Skeleton className="mx-auto h-12 w-48 rounded-xl" />
        </div>
      </div>
    </main>
  );
}

function OrderSuccessError({ message }) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900">
        <AlertCircle className="mx-auto h-20 w-20 text-red-500" />

        <h1 className="mt-6 text-2xl font-bold">اطلاعات سفارش پیدا نشد</h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">{message}</p>

        <Link
          href="/account/orders"
          className="
          mt-8
          inline-block
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          transition
          hover:bg-gray-800
          dark:bg-white
          dark:text-black
          dark:hover:bg-gray-200
          "
        >
          مشاهده سفارش‌های من
        </Link>
      </div>
    </main>
  );
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const hydrated = useHydration();

  const orderId = searchParams.get("id");

  const order = useOrderStore((state) => state.currentOrder);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  const [error, setError] = useState(null);

  useEffect(() => {
    // پیش از بازیابی توکن، درخواست بدون هدر Authorization می‌رفت و ۴۰۱ می‌گرفت
    if (!hydrated || !orderId) return;

    fetchOrderById(orderId).catch((fetchError) => {
      setError(fetchError.message || "دریافت اطلاعات سفارش انجام نشد.");
    });
  }, [hydrated, orderId, fetchOrderById]);

  // شناسه‌ی سفارش هیچ‌وقت از سرور نمی‌آید و به fetch نیازی ندارد، پس
  // مستقیم در رندر تعیین می‌شود، نه با setState داخل افکت
  if (hydrated && !orderId) {
    return <OrderSuccessError message="شناسه‌ی سفارش در آدرس پیدا نشد." />;
  }

  if (error) {
    return <OrderSuccessError message={error} />;
  }

  // بدون این چک، بعد از یک سفارشِ قبلی، currentOrder همان سفارش کهنه را
  // نگه داشته و تا رسیدن پاسخِ fetch جدید، به‌جای اسکلتون نشان داده می‌شود
  if (!order || order._id !== orderId) {
    return <OrderSuccessSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow dark:bg-gray-900">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="mt-6 text-3xl font-bold">سفارش شما ثبت شد 🎉</h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">از خرید شما در NovaShop متشکریم</p>

        <div className="mt-8 space-y-4 rounded-xl bg-gray-50 p-5 text-right dark:bg-gray-800">
          <div className="flex justify-between">
            <span>شماره سفارش</span>

            <span className="font-bold">{order._id?.slice(-8)}</span>
          </div>

          <div className="flex justify-between">
            <span>تعداد کالا</span>

            <span className="font-bold">
              {order.items?.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-4 font-bold dark:border-gray-700">
            <span>مبلغ پرداختی</span>

            <span>{formatPrice(order.totalPrice || 0)}</span>
          </div>
        </div>

        <Link
          href={`/account/orders/${order._id}`}
          className="
          mt-8
          inline-block
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          transition
          hover:bg-gray-800
          dark:bg-white
          dark:text-black
          dark:hover:bg-gray-200
          "
        >
          مشاهده جزئیات سفارش
        </Link>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  // useSearchParams از رندر روی سرور خارج می‌شود، پس باید مرز Suspense داشته باشد
  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
