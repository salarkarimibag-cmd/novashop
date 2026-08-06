"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";

export default function ProductInfo({ product }) {
  const router = useRouter();

  const productId =
    typeof product._id === "object"
      ? product._id._id
      : product._id || product.id;

  console.log("PRODUCT ID:", productId);

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null,
  );

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);

  const [quantity, setQuantity] = useState(1);

  // ======================
  // Cart
  // ======================

  const addItem = useCartStore((state) => state.addItem);

  const cartItems = useCartStore((state) => state.items);

  const isInCart = cartItems.some(
    (item) => String(item.product?._id || item.product) === String(productId),
  );

  // ======================
  // Wishlist
  // ======================

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const liked = useWishlistStore((state) => state.isInWishlist(productId));

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(productId);

      toast.info("از علاقه‌مندی‌ها حذف شد");
    } else {
      addToWishlist({
        ...product,
        id: productId,
      });

      toast.success("به علاقه‌مندی‌ها اضافه شد");
    }
  };

  // ======================
  // Add Cart
  // ======================

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
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

    try {
      await addItem(productId, quantity);

      toast.success("محصول به سبد خرید اضافه شد", {
        description: product.title,
      });
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
    }
  };

  const finalPrice =
    product.discountPrice && product.discountPrice < product.price
      ? product.discountPrice
      : product.price;

  console.log("FULL PRODUCT:", product);
  console.log("RAW _id:", product._id);
  console.log("FINAL ID:", productId);
  return (
    <div className="space-y-6">
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

      <div>
        <div className="flex items-center gap-3">
          {product.discountPrice && product.discountPrice < product.price && (
            <span className="text-lg text-gray-400 line-through">
              {product.price.toLocaleString("fa-IR")}
              تومان
            </span>
          )}

          <span className="text-3xl font-bold text-red-600">
            {finalPrice.toLocaleString("fa-IR")}
            تومان
          </span>
        </div>

        <div className="mt-3">
          {product.stock > 0 ? (
            <span className="text-green-600">✓ موجود در انبار</span>
          ) : (
            <span className="text-red-500">ناموجود</span>
          )}
        </div>
      </div>

      {product.colors?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">رنگ</h3>

          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                }}
                className={`
                      h-10 w-10 rounded-full border
                      ${
                        selectedColor === color
                          ? "ring-2 ring-black scale-110"
                          : ""
                      }
                    `}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes?.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">سایز</h3>

          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                      rounded-lg border px-4 py-2
                      ${selectedSize === size ? "bg-black text-white" : ""}
                    `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 font-semibold">تعداد</h3>

        <div className="flex w-fit items-center rounded-lg border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-xl"
          >
            -
          </button>

          <span className="w-12 text-center">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => Math.min(q + 1, product.stock))}
            className="px-4 py-2 text-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className={`
            flex flex-1 items-center justify-center
            gap-2 rounded-xl px-6 py-4 text-white

            ${isInCart ? "bg-emerald-600" : "bg-black"}

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
            rounded-xl border p-4

            ${liked ? "bg-red-50 text-red-500" : ""}
          `}
        >
          <Heart size={22} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
