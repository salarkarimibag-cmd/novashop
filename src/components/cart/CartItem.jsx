"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const product = item.product;

  if (!product) return null;

  const productId =
    typeof product._id === "object"
      ? product._id._id
      : product._id || product.id;

  const handleIncrease = async () => {
    try {
      await increaseQuantity(String(productId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDecrease = async () => {
    try {
      await decreaseQuantity(String(productId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(String(productId));

      toast.success("محصول از سبد خرید حذف شد");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          src={getProductImage(product)}
          alt={product.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

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

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
          "
        >
          <button
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            className="
              rounded-lg
              border
              p-2
              transition
              hover:bg-gray-100
              disabled:opacity-40
            "
          >
            <Minus size={16} />
          </button>

          <span className="min-w-6 text-center">{item.quantity}</span>

          <button
            onClick={handleIncrease}
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

      <button
        onClick={handleRemove}
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
