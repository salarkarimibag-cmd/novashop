"use client";

import EmptyCart from "@/components/cart/EmptyCart";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

import useCart from "@/hooks/useCart";

export default function CartPage() {
  const { items } = useCart();

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
            {/* Products */}
            <section className="rounded-2xl bg-white shadow-sm lg:col-span-2">
              <div className="border-b p-5">
                <h2 className="text-xl font-bold">محصولات انتخاب شده</h2>
              </div>

              <CartList />
            </section>

            {/* Summary */}
            <aside>
              <CartSummary />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
