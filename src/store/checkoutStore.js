import { create } from "zustand";
import { persist } from "zustand/middleware";

// آدرس تحویل اینجا نگهداری نمی‌شود: سفارش با شناسه‌ی یکی از آدرس‌های
// ذخیره‌شده روی سرور ثبت می‌شود، پس addressStore صاحب آن است.
// این استور فقط انتخاب‌های موقتِ همین صفحه‌ی تسویه را نگه می‌دارد.
const useCheckoutStore = create(
  persist(
    (set) => ({
      paymentMethod: "online",

      discountCode: "",

      note: "",

      setPaymentMethod: (method) =>
        set({
          paymentMethod: method,
        }),

      setDiscountCode: (code) =>
        set({
          discountCode: code,
        }),

      setNote: (note) =>
        set({
          note,
        }),

      clearCheckout: () =>
        set({
          paymentMethod: "online",

          discountCode: "",

          note: "",
        }),
    }),

    {
      name: "nova-checkout",
      skipHydration: true,
    },
  ),
);

export default useCheckoutStore;
