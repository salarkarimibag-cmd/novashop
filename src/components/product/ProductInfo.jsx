"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";
export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);

  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="space-y-6">
      {/* عنوان */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="mt-3 flex items-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span>{product.rating}</span>

          <span className="text-gray-500">({product.reviews} نظر)</span>
        </div>
      </div>

      {/* قیمت */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-600">
            {product.price.toLocaleString()} تومان
          </span>

          {product.oldPrice && (
            <span className="text-lg text-gray-400 line-through">
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* رنگ */}
      {product.colors?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">رنگ</h3>

          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-full border-2 transition ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* سایز */}
      {product.sizes?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">سایز</h3>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg border px-4 py-2 transition ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* تعداد */}
      <div>
        <h3 className="mb-3 font-semibold">تعداد</h3>

        <div className="flex w-fit items-center rounded-lg border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-xl"
          >
            −
          </button>

          <span className="w-12 text-center">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 text-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => addItem(product)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-white transition hover:bg-gray-800"
        >
          <ShoppingCart size={20} />
          افزودن به سبد خرید
        </button>

        <button className="rounded-xl border p-4 transition hover:bg-gray-100">
          <Heart size={22} />
        </button>
      </div>
    </div>
  );
}
