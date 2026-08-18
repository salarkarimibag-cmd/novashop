"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import useCartStore, { selectTotalQuantity } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  const totalQuantity = useCartStore(selectTotalQuantity);

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
          text-gray-700
          transition
          hover:bg-gray-100
          dark:border-gray-700
          dark:text-gray-200
          dark:hover:bg-gray-800
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
