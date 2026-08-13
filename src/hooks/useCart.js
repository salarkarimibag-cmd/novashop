"use client";

import useCartStore, { selectTotalQuantity } from "@/store/cartStore";

export default function useCart() {
  const items = useCartStore((state) => state.items);

  const totalPrice = useCartStore((state) => state.totalPrice);

  const addItem = useCartStore((state) => state.addItem);

  const removeItem = useCartStore((state) => state.removeItem);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  // resetCart فقط state محلی را خالی می‌کند. برای پایان چک‌اوت همین لازم است،
  // چون سرور خودش سبد را هنگام ثبت سفارش خالی کرده. clearCart که درخواست
  // DELETE می‌فرستد، در استور باقی است برای دکمه‌ی «خالی کردن سبد».
  const resetCart = useCartStore((state) => state.resetCart);

  const totalQuantity = useCartStore(selectTotalQuantity);

  return {
    items,

    addItem,
    removeItem,

    increaseQuantity,
    decreaseQuantity,

    resetCart,

    totalQuantity,
    totalPrice,
  };
}
