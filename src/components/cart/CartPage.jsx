"use client";

import { useEffect } from "react";

import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import CartSkeleton from "@/components/cart/CartSkeleton";
import { useHydration } from "@/components/providers/HydrationProvider";
import useCartStore from "@/store/cartStore";

export default function CartPage() {
  const hydrated = useHydration();

  const items = useCartStore((state) => state.items);

  const loading = useCartStore((state) => state.loading);

  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    // پیش از بازیابی توکن، درخواست بدون هدر Authorization می‌رفت و ۴۰۱ می‌گرفت
    if (!hydrated) return;

    fetchCart();
  }, [hydrated, fetchCart]);

  if (!hydrated || loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <CartSkeleton count={4} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">سبد خرید</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <EmptyCart />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="overflow-hidden rounded-2xl bg-white shadow-sm lg:col-span-2">
              <div className="border-b p-5">
                <h2 className="text-xl font-bold">محصولات انتخاب شده</h2>
              </div>

              <CartList />
            </section>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <CartSummary />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
