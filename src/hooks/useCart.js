"use client";

import useCartStore, { selectTotalQuantity } from "@/store/cartStore";

export default function useCart() {
  const items = useCartStore((state) => state.items);

  const totalPrice = useCartStore((state) => state.totalPrice);

  const addItem = useCartStore((state) => state.addItem);

  const removeItem = useCartStore((state) => state.removeItem);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const clearCart = useCartStore((state) => state.clearCart);

  const totalQuantity = useCartStore(selectTotalQuantity);

  return {
    items,

    addItem,
    removeItem,

    increaseQuantity,
    decreaseQuantity,

    clearCart,

    totalQuantity,
    totalPrice,
  };
}
