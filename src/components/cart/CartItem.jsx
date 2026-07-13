"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import useCart from "@/hooks/useCart";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const handleRemove = () => {
    removeItem(item.id);

    toast.error("محصول از سبد خرید حذف شد");
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="flex gap-4 border-b border-gray-100 p-4 transition hover:bg-gray-50">
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold leading-6">
          {item.title}
        </h3>

        {item.brand && (
          <span className="mt-1 text-xs text-gray-500">{item.brand}</span>
        )}

        <p className="mt-2 text-sm text-gray-500">
          {item.price.toLocaleString("fa-IR")} تومان
        </p>

        <p className="mt-1 font-bold text-indigo-600">
          {totalPrice.toLocaleString("fa-IR")} تومان
        </p>

        <div className="mt-3 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-xl border bg-white">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="p-2 transition hover:bg-gray-100"
              aria-label="کاهش تعداد"
            >
              <Minus size={15} />
            </button>

            <span className="min-w-10 text-center text-sm font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="p-2 transition hover:bg-gray-100"
              aria-label="افزایش تعداد"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
            aria-label="حذف محصول"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
