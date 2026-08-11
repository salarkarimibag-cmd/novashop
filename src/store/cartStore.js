"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import cartService from "@/services/cartService";
import useAuthStore from "@/store/authStore";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // برخلاف تعداد کالاها، این مقدار را سرور حساب می‌کند
      totalPrice: 0,

      loading: false,

      error: null,

      // جلوگیری از درخواست‌های همزمان
      isFetching: false,

      // =========================
      // آپدیت State Cart
      // =========================
      updateCartState: (cart) => {
        const items = cart?.items || [];

        set({
          items,

          totalPrice: cart?.totalPrice || 0,
        });
      },

      // =========================
      // دریافت Cart از Backend
      // =========================
      fetchCart: async () => {
        const state = get();

        // جلوگیری از loop
        if (state.isFetching) {
          return;
        }

        // سبد خرید سرور-محور است؛ بدون ورود، درخواست حتماً رد می‌شود
        if (!useAuthStore.getState().token) {
          return;
        }

        try {
          set({
            loading: true,
            error: null,
            isFetching: true,
          });

          const res = await cartService.getCart();

          get().updateCartState(res.data);
        } catch (error) {
          set({
            error: error.message,
          });

          console.error("FETCH CART ERROR:", error);
        } finally {
          set({
            loading: false,
            isFetching: false,
          });
        }
      },

      // =========================
      // افزودن محصول
      // =========================
      addItem: async (productId, quantity = 1) => {
        try {
          set({
            loading: true,
            error: null,
          });

          const res = await cartService.addToCart(String(productId), quantity);

          get().updateCartState(res.data);

          return res.data;
        } catch (error) {
          set({
            error: error.message,
          });

          throw error;
        } finally {
          set({
            loading: false,
          });
        }
      },

      // =========================
      // افزایش تعداد
      // =========================
      increaseQuantity: async (productId) => {
        try {
          const res = await cartService.increaseQuantity(productId);

          get().updateCartState(res.data);
        } catch (error) {
          set({
            error: error.message,
          });

          throw error;
        }
      },

      // =========================
      // کاهش تعداد
      // =========================
      decreaseQuantity: async (productId) => {
        try {
          const res = await cartService.decreaseQuantity(productId);

          get().updateCartState(res.data);
        } catch (error) {
          set({
            error: error.message,
          });

          throw error;
        }
      },

      // =========================
      // حذف محصول
      // =========================
      removeItem: async (productId) => {
        try {
          const res = await cartService.removeItem(productId);

          get().updateCartState(res.data);
        } catch (error) {
          set({
            error: error.message,
          });

          throw error;
        }
      },

      // =========================
      // پاک کردن Cart
      // =========================
      clearCart: async () => {
        try {
          await cartService.clearCart();

          set({
            items: [],

            totalPrice: 0,
          });
        } catch (error) {
          set({
            error: error.message,
          });

          throw error;
        }
      },

      // =========================
      // Sync دستی
      // =========================
      syncCart: async () => {
        await get().fetchCart();
      },

      // =========================
      // Getter
      // =========================
      getTotalPrice: () => {
        return get().totalPrice;
      },

      // =========================
      // Reset
      // =========================
      resetCart: () => {
        set({
          items: [],

          totalPrice: 0,

          error: null,
        });
      },

      clearError: () => {
        set({
          error: null,
        });
      },
    }),

    {
      name: "nova-cart",

      skipHydration: true,
    },
  ),
);

/**
 * تعداد کل کالاهای سبد.
 *
 * از روی items محاسبه می‌شود و در state نگهداری نمی‌شود، تا هیچ‌وقت
 * با محتوای واقعی سبد ناهماهنگ نشود.
 */
export const selectTotalQuantity = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export default useCartStore;
