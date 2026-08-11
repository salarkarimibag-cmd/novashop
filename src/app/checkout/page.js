"use client";

import { useEffect } from "react";

import CartSkeleton from "@/components/cart/CartSkeleton";
import EmptyCart from "@/components/cart/EmptyCart";

import useCartStore from "@/store/cartStore";
import useAddressStore from "@/store/addressStore";

import {
  CheckoutForm,
  ShippingMethod,
  PaymentMethod,
  OrderSummary,
  OrderItems,
} from "@/components/checkout";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  useEffect(() => {
    fetchAddresses();

    const store = useCartStore.getState();

    // فقط اگر Cart نداریم دریافت کن
    if (store.items.length === 0 && !store.isFetching) {
      store.fetchCart();
    }
  }, [fetchAddresses]);

  if (loading) {
    return <CartSkeleton count={3} />;
  }

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-sm">
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
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckoutForm />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <ShippingMethod />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <OrderItems items={items} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
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
