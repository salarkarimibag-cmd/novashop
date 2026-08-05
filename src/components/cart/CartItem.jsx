"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const product = item.product?.product || item.product;
  if (!product) return null;
  const productId = product._id || product.id;
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{product.title}</h3>

        <p className="mt-2 font-bold">{formatPrice(item.price)}</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(productId)}
            className="rounded-lg border p-2"
          >
            <Minus size={16} />
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(productId)}
            className="rounded-lg border p-2"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button onClick={() => removeItem(productId)} className="text-red-500">
        <Trash2 size={20} />
      </button>
    </div>
  );
}
