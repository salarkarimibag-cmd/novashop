"use client";

import useCart from "@/hooks/useCart";
import useCheckoutStore from "@/store/checkoutStore";
import { SHIPPING_PRICES } from "@/constants/shipping";
import Button from "@/components/ui/Button";
import OrderItems from "./OrderItems";
export default function OrderSummary() {
  const { items } = useCart();

  const { shippingMethod, shippingAddress, paymentMethod } = useCheckoutStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = SHIPPING_PRICES[shippingMethod] ?? 0;

  const discount = 0;

  const total = subtotal + shipping - discount;
  const handleSubmitOrder = () => {
    if (!items.length) {
      alert("سبد خرید شما خالی است");
      return;
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address
    ) {
      alert("لطفاً اطلاعات گیرنده را کامل کنید");
      return;
    }

    if (!paymentMethod) {
      alert("لطفاً روش پرداخت را انتخاب کنید");
      return;
    }

    const order = {
      id: Date.now(),
      items,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      total,
      createdAt: new Date(),
    };

    console.log(order);
  };

  return (
    <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">خلاصه سفارش</h2>
      <OrderItems />

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>تعداد کالا</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>جمع خرید</span>
          <span>{subtotal.toLocaleString()} تومان</span>
        </div>

        <div className="flex justify-between">
          <span>هزینه ارسال</span>

          <span>
            {shipping === 0 ? "رایگان" : `${shipping.toLocaleString()} تومان`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>تخفیف</span>

          <span>{discount.toLocaleString()} تومان</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ قابل پرداخت</span>

          <span>{total.toLocaleString()} تومان</span>
        </div>
      </div>

      <Button onClick={handleSubmitOrder} className="mt-6 w-full">
        ثبت سفارش نهایی
      </Button>
    </div>
  );
}
