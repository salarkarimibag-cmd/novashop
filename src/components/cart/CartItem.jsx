"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import useCart from "@/hooks/useCart";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-gray-100 p-4">
      {/* Image */}
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold">{item.title}</h3>

        {item.brand && (
          <span className="mt-1 text-xs text-gray-500">{item.brand}</span>
        )}

        <p className="mt-2 font-bold text-black">
          {item.price.toLocaleString("fa-IR")} تومان
        </p>

        <div className="mt-auto flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center rounded-lg border">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="p-2 transition hover:bg-gray-100"
              aria-label="کاهش تعداد"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-10 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="p-2 transition hover:bg-gray-100"
              aria-label="افزایش تعداد"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
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
