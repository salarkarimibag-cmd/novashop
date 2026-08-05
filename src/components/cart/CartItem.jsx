"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const product = item.product;

  if (!product) return null;

  const productId = product._id || product.id;

  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        p-4
      "
    >
      {/* Image */}

      <div
        className="
          relative
          h-24
          w-24
          shrink-0
          overflow-hidden
          rounded-lg
        "
      >
        <Image
          src={product.images?.[0] || "/images/placeholder.png"}
          alt={product.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Info */}

      <div className="flex-1">
        <h3
          className="
            line-clamp-2
            font-semibold
          "
        >
          {product.title}
        </h3>

        <p className="mt-2 font-bold">{formatPrice(item.price)}</p>

        {/* Quantity */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={() => decreaseQuantity(productId)}
            className="
              rounded-lg
              border
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <Minus size={16} />
          </button>

          <span className="min-w-6 text-center">{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(productId)}
            className="
              rounded-lg
              border
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Remove */}

      <button
        onClick={() => removeItem(productId)}
        className="
          rounded-lg
          p-2
          text-red-500
          transition
          hover:bg-red-50
        "
        aria-label="حذف محصول"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
