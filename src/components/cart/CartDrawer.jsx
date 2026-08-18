"use client";

import { X, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

import useCartStore, { selectTotalQuantity } from "@/store/cartStore";

import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import CartSkeleton from "./CartSkeleton";

export default function CartDrawer({ open, onClose }) {
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  const totalItems = useCartStore(selectTotalQuantity);

  // فقط کنترل Scroll صفحه
  // دریافت Cart در CartPage انجام می‌شود
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          transition-opacity
          duration-300
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-md
          flex-col
          bg-white
          shadow-2xl
          dark:bg-gray-900
          transition-transform
          duration-300
          ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-200
            px-5
            py-4
            dark:border-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} />

            <h2 className="font-bold">سبد خرید</h2>

            {totalItems > 0 && (
              <span
                className="
                  rounded-full
                  bg-indigo-100
                  px-2
                  py-1
                  text-xs
                  font-semibold
                  text-indigo-700
                  dark:bg-indigo-950/50
                  dark:text-indigo-300
                "
              >
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="
              rounded-full
              p-2
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex-1 overflow-y-auto">
            <CartSkeleton count={3} />
          </div>
        ) : items.length === 0 ? (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center
            "
          >
            <EmptyCart />
          </div>
        ) : (
          <>
            {/* Items */}
            <div
              className="
                flex-1
                overflow-y-auto
              "
            >
              <CartList />
            </div>

            {/* Summary */}
            <div
              className="
                border-t
                border-gray-200
                bg-white
                p-4
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <CartSummary />

              <Link
                href="/cart"
                onClick={onClose}
                className="
                  mt-4
                  block
                  w-full
                  rounded-xl
                  bg-black
                  py-3
                  text-center
                  font-semibold
                  text-white
                  transition
                  hover:bg-gray-800
                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-gray-200
                "
              >
                مشاهده سبد خرید
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
