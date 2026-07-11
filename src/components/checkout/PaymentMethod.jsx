"use client";

import { CreditCard, Wallet, Landmark } from "lucide-react";
import useCheckoutStore from "@/store/checkoutStore";

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  const methods = [
    {
      id: "online",
      title: "پرداخت آنلاین",
      description: "پرداخت از طریق درگاه بانکی",
      icon: CreditCard,
    },
    {
      id: "cash",
      title: "پرداخت در محل",
      description: "پرداخت هنگام تحویل سفارش",
      icon: Wallet,
    },
    {
      id: "card",
      title: "کارت به کارت",
      description: "واریز به شماره کارت فروشگاه",
      icon: Landmark,
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">روش پرداخت</h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                paymentMethod === method.id
                  ? "border-black bg-gray-50"
                  : "hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                />

                <Icon size={22} />

                <div>
                  <p className="font-semibold">{method.title}</p>

                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
