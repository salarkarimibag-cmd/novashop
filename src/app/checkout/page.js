"use client";

import {
  CheckoutForm,
  ShippingMethod,
  PaymentMethod,
  OrderSummary,
  OrderItems,
} from "@/components/checkout";

import EmptyCart from "@/components/cart/EmptyCart";
import useCart from "@/hooks/useCart";

export default function CheckoutPage() {
  const { items } = useCart();

  if (items.length === 0) {
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
              <OrderItems />
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
