"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";

export default function ProductInfo({ product }) {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null,
  );

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);

  const [quantity, setQuantity] = useState(1);

  // Cart
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  // Wishlist
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const liked = useWishlistStore((state) => state.isInWishlist(product._id));

  const isInCart = cartItems.some(
    (item) =>
      item.id === product._id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize,
  );

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(product._id);

      toast.info("از علاقه‌مندی‌ها حذف شد");
    } else {
      addToWishlist(product);

      toast.success("به علاقه‌مندی‌ها اضافه شد");
    }
  };

  const handleAddToCart = () => {
    if (product.inStock === false) {
      toast.error("این محصول موجود نیست");
      return;
    }

    if (isInCart) {
      router.push("/cart");
      return;
    }

    if (product.colors?.length && !selectedColor) {
      toast.error("لطفا رنگ محصول را انتخاب کنید");
      return;
    }

    if (product.sizes?.length && !selectedSize) {
      toast.error("لطفا سایز محصول را انتخاب کنید");
      return;
    }

    addItem({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });

    toast.success("محصول به سبد خرید اضافه شد", {
      description: product.title,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}

      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="mt-3 flex items-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />

          <span>{product.rating || 0}</span>

          <span className="text-gray-500">({product.reviews || 0} نظر)</span>
        </div>

        {product.brand && (
          <p className="mt-2 text-sm text-gray-500">برند: {product.brand}</p>
        )}
      </div>

      {/* Price */}

      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-600">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          {product.oldPrice && (
            <span className="text-lg text-gray-400 line-through">
              {product.oldPrice.toLocaleString("fa-IR")} تومان
            </span>
          )}
        </div>

        <div className="mt-3">
          {product.inStock !== false ? (
            <span className="text-sm text-green-600">✓ موجود در انبار</span>
          ) : (
            <span className="text-sm text-red-500">ناموجود</span>
          )}
        </div>
      </div>

      {/* Colors */}

      {product.colors?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">رنگ</h3>

          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`
                  h-10 w-10 rounded-full border transition
                  ${
                    selectedColor === color
                      ? "ring-2 ring-black ring-offset-2 scale-110"
                      : "border-gray-300"
                  }
                `}
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}

      {product.sizes?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">سایز</h3>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                rounded-lg border px-4 py-2 transition

                ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:border-black"
                }

                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}

      <div>
        <h3 className="mb-3 font-semibold">تعداد</h3>

        <div className="flex w-fit items-center rounded-lg border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-xl"
          >
            −
          </button>

          <span className="w-12 text-center font-bold">{quantity}</span>

          <button
            onClick={() =>
              setQuantity((q) => Math.min(q + 1, product.stock || 10))
            }
            className="px-4 py-2 text-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className={`
          flex flex-1 items-center justify-center gap-2
          rounded-xl px-6 py-4 text-white transition

          ${
            isInCart
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-black hover:bg-gray-800"
          }

          `}
        >
          {isInCart ? (
            <>
              <Check size={20} />
              مشاهده سبد خرید
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              افزودن به سبد خرید
            </>
          )}
        </button>

        <button
          onClick={handleWishlist}
          className={`
          rounded-xl border p-4 transition

          ${liked ? "bg-red-50 text-red-500" : "hover:bg-gray-100"}

          `}
        >
          <Heart size={22} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
