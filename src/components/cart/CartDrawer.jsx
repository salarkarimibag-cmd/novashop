"use client";

import { X } from "lucide-react";

import useCart from "@/hooks/useCart";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default function CartDrawer({ open, onClose }) {
  const { items } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold">سبد خرید</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1">
            <EmptyCart />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <CartList />
            </div>

            <CartSummary />
          </>
        )}
      </aside>
    </>
  );
}
