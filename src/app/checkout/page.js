import {
  CheckoutForm,
  ShippingMethod,
  PaymentMethod,
  OrderSummary,
  OrderItems,
} from "@/components/checkout";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">تسویه حساب</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <CheckoutForm />

          <OrderItems />

          <ShippingMethod />

          <PaymentMethod />
        </section>

        <aside>
          <OrderSummary />
        </aside>
      </div>
    </main>
  );
}
