"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import cartService from "@/services/cartService";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      totalPrice: 0,

      totalQuantity: 0,

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

          totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
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

            totalQuantity: 0,
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
      getTotalItems: () => {
        return get().totalQuantity;
      },

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

          totalQuantity: 0,

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

export default useCartStore;
