"use client";

import CartItem from "./CartItem";
import useCartStore from "@/store/cartStore";
import CartSkeleton from "./CartSkeleton";
export default function CartList() {
  const items = useCartStore((state) => state.items);

  const loading = useCartStore((state) => state.loading);

  if (loading) {
    return <CartSkeleton />;
  }
  
  if (!items.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        سبد خرید شما خالی است
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {items.map((item, index) => (
        <CartItem key={item._id || item.product?._id || index} item={item} />
      ))}
    </div>
  );
}
