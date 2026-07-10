"use client";

import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";

export default function CartList() {
  const { items } = useCart();

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
