import apiClient from "@/lib/apiClient";

const cartService = {
  // دریافت سبد خرید
  getCart() {
    return apiClient("/api/cart");
  },

  // دریافت تعداد محصولات Cart
  getCartCount() {
    return apiClient("/api/cart/count");
  },

  // افزودن محصول به سبد
  addToCart(productId, quantity = 1) {
    return apiClient("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
  },

  // افزایش تعداد
  increaseQuantity(productId) {
    return apiClient(`/api/cart/increase/${productId}`, {
      method: "PATCH",
    });
  },

  // کاهش تعداد
  decreaseQuantity(productId) {
    return apiClient(`/api/cart/decrease/${productId}`, {
      method: "PATCH",
    });
  },

  // حذف محصول
  removeItem(productId) {
    return apiClient(`/api/cart/${productId}`, {
      method: "DELETE",
    });
  },

  // پاک کردن کامل سبد
  clearCart() {
    return apiClient("/api/cart", {
      method: "DELETE",
    });
  },
};

export default cartService;
