"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import CartSkeleton from "@/components/cart/CartSkeleton";
import EmptyCart from "@/components/cart/EmptyCart";

import { useHydration } from "@/components/providers/HydrationProvider";
import useCartStore from "@/store/cartStore";
import useAddressStore from "@/store/addressStore";

import {
  AddressPicker,
  ShippingInfo,
  PaymentMethod,
  OrderSummary,
  OrderItems,
} from "@/components/checkout";

export default function CheckoutPage() {
  const hydrated = useHydration();

  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  useEffect(() => {
    // پیش از بازیابی توکن، درخواست بدون هدر Authorization می‌رفت و ۴۰۱ می‌گرفت
    if (!hydrated) return;

    // fetchAddresses خطا را دوباره پرتاب می‌کند. اگر اینجا گرفته نشود،
    // یک promise ردشده‌ی بی‌صاحب می‌ماند و کل صفحه را می‌ترکاند —
    // آن هم بدون اینکه کاربر بفهمد چرا آدرس‌هایش نیامده.
    fetchAddresses().catch((error) => {
      console.error("FETCH ADDRESSES ERROR:", error);

      toast.error(error?.message || "دریافت آدرس‌ها انجام نشد");
    });

    const store = useCartStore.getState();

    // فقط اگر Cart نداریم دریافت کن
    if (store.items.length === 0 && !store.isFetching) {
      store.fetchCart();
    }
  }, [hydrated, fetchAddresses]);

  if (!hydrated || loading) {
    return <CartSkeleton count={3} />;
  }

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-sm dark:bg-gray-900">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">تسویه حساب</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <AddressPicker />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <ShippingInfo />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <OrderItems items={items} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <PaymentMethod />
            </div>
          </section>

          <aside>
            <OrderSummary />
          </aside>
        </div>
      </div>
    </main>
  );
}
