"use client";

import { X, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

import useCart from "@/hooks/useCart";

import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default function CartDrawer({ open, onClose }) {
  const { items, totalItems } = useCart();

  // جلوگیری از اسکرول پشت Drawer
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} />

            <h2 className="font-bold">سبد خرید</h2>

            {totalItems > 0 && (
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="بستن سبد خرید"
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyCart />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <CartList />
            </div>

            <div className="border-t bg-white p-4">
              <CartSummary />
            </div>
          </>
        )}
      </aside>
    </>
  );
}
