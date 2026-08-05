"use client";

import CartItem from "./CartItem";
import useCartStore from "@/store/cartStore";

export default function CartList() {
  const items = useCartStore((state) => state.items);

  if (!items.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        سبد خرید شما خالی است
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
