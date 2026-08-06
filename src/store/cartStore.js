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

      // =========================
      // آپدیت یکپارچه Cart
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
        try {
          set({
            loading: true,
            error: null,
          });

          const res = await cartService.getCart();

          get().updateCartState(res.data);
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
      // خالی کردن Cart
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
      // تعداد کل کالاها
      // =========================
      getTotalItems: () => {
        return get().totalQuantity;
      },

      // =========================
      // قیمت کل
      // =========================
      getTotalPrice: () => {
        return get().totalPrice;
      },

      // =========================
      // پاک کردن State
      // =========================
      resetCart: () => {
        set({
          items: [],
          totalPrice: 0,
          totalQuantity: 0,
          error: null,
        });
      },

      // =========================
      // پاک کردن Error
      // =========================
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
