"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import { SHIPPING_PRICES } from "@/constants/shipping";

export default function OrderSummary() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { items, totalQuantity, clearCart } = useCart();

  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);

  const shippingMethod = useCheckoutStore((state) => state.shippingMethod);

  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);

  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const addOrder = useOrderStore((state) => state.addOrder);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = SHIPPING_PRICES[shippingMethod] ?? 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

  const handleSubmitOrder = () => {
    if (loading) return;

    if (!items.length) {
      toast.error("سبد خرید شما خالی است");
      return;
    }

    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.phone ||
      !shippingAddress?.address
    ) {
      toast.error("اطلاعات گیرنده را کامل کنید");
      return;
    }

    setLoading(true);

    const order = {
      id: crypto.randomUUID(),

      items: [...items],

      status: "pending",

      shippingAddress,

      shippingMethod,

      paymentMethod,

      subtotal,

      shipping,

      discount,

      total,

      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    clearCart();

    clearCheckout();

    toast.success("سفارش با موفقیت ثبت شد");

    router.push("/order-success");
  };

  return (
    <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">خلاصه سفارش</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>تعداد کالا</span>
          <span>{totalQuantity}</span>
        </div>

        <div className="flex justify-between">
          <span>جمع خرید</span>

          <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
        </div>

        <div className="flex justify-between">
          <span>هزینه ارسال</span>

          <span>
            {shipping === 0
              ? "رایگان"
              : `${shipping.toLocaleString("fa-IR")} تومان`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>تخفیف</span>

          <span>{discount.toLocaleString("fa-IR")} تومان</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ قابل پرداخت</span>

          <span>{total.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <Button
        onClick={handleSubmitOrder}
        disabled={loading}
        className="mt-6 w-full"
      >
        {loading ? "در حال ثبت..." : "ثبت سفارش نهایی"}
      </Button>
    </div>
  );
}
