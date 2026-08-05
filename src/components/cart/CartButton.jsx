"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCartStore from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          relative
          rounded-lg
          border
          border-gray-300
          p-2
          transition
          hover:bg-gray-100
        "
        aria-label="سبد خرید"
      >
        <ShoppingCart size={20} />

        {totalQuantity > 0 && (
          <span
            className="
              absolute
              -right-2
              -top-2
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-xs
              font-bold
              text-white
            "
          >
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
