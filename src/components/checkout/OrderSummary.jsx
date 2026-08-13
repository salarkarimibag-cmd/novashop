"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import useAddressStore from "@/store/addressStore";
import { getShippingCost } from "@/constants/shipping";

export default function OrderSummary() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { items, totalQuantity, resetCart } = useCart();

  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);

  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const createOrder = useOrderStore((state) => state.createOrder);

  const selectedAddress = useAddressStore(
    (state) =>
      state.selectedAddress ||
      state.addresses.find((address) => address.isDefault),
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingCost = getShippingCost(subtotal);

  const discount = 0;

  const total = subtotal + shippingCost - discount;

  const handleSubmitOrder = async () => {
    if (loading) return;

    if (!items.length) {
      toast.error("سبد خرید شما خالی است");
      return;
    }

    if (!selectedAddress?._id) {
      toast.error("لطفاً آدرس ارسال را انتخاب کنید");
      return;
    }

    try {
      setLoading(true);

      const order = await createOrder({
        addressId: selectedAddress._id,

        paymentMethod: paymentMethod || "online",
      });

      // سرور سبد را هنگام ساخت سفارش خالی کرده (claimForOrder)، پس اینجا
      // فقط state محلی هم‌تراز می‌شود. درخواست DELETE اضافه‌ای که قبلاً
      // اینجا بود نه await می‌شد و نه catch — یعنی خطایش از try/catch فرار
      // می‌کرد و صفحه را می‌ترکاند.
      resetCart();

      clearCheckout();

      toast.success("سفارش با موفقیت ثبت شد");

      router.push(`/order-success?id=${order._id}`);
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error);

      toast.error(error?.message || "ثبت سفارش انجام نشد");
    } finally {
      setLoading(false);
    }
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
            {shippingCost === 0
              ? "رایگان"
              : `${shippingCost.toLocaleString("fa-IR")} تومان`}
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
