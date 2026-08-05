"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import cartService from "@/services/cartService";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await cartService.getCartCount();

      setTotalQuantity(res.data.count || 0);
    } catch (error) {
      console.log("Cart count error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

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
