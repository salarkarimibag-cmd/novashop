"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Skeleton from "@/components/ui/Skeleton";
import useOrderStore from "@/store/orderStore";
import formatPrice from "@/lib/formatPrice";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("id");

  const order = useOrderStore((state) => state.currentOrder);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId).catch(console.error);
    }
  }, [orderId, fetchOrderById]);

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
          <div className="space-y-6">
            <Skeleton className="mx-auto h-20 w-20 rounded-full" />

            <Skeleton className="mx-auto h-8 w-64" />

            <Skeleton className="mx-auto h-4 w-80" />

            <div className="space-y-5 rounded-xl bg-gray-50 p-5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="border-t pt-4">
                <Skeleton className="h-6 w-44" />
              </div>
            </div>

            <Skeleton className="mx-auto h-12 w-48 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="mt-6 text-3xl font-bold">سفارش شما ثبت شد 🎉</h1>

        <p className="mt-3 text-gray-500">از خرید شما در NovaShop متشکریم</p>

        <div className="mt-8 space-y-4 rounded-xl bg-gray-50 p-5 text-right">
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

          <div className="flex justify-between border-t pt-4 font-bold">
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
          "
        >
          مشاهده جزئیات سفارش
        </Link>
      </div>
    </main>
  );
}
