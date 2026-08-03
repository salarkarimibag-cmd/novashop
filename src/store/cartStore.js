"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import cartService from "@/services/cartService";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      loading: false,
      error: null,

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

          set({
            items: res.data.items || [],
            totalPrice: res.data.totalPrice || 0,
          });
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

          const res = await cartService.addToCart(productId, quantity);

          set({
            items: res.data.items || [],
            totalPrice: res.data.totalPrice || 0,
          });

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
        const res = await cartService.increaseQuantity(productId);

        set({
          items: res.data.items || [],
          totalPrice: res.data.totalPrice || 0,
        });
      },

      // =========================
      // کاهش تعداد
      // =========================
      decreaseQuantity: async (productId) => {
        const res = await cartService.decreaseQuantity(productId);

        set({
          items: res.data.items || [],
          totalPrice: res.data.totalPrice || 0,
        });
      },

      // =========================
      // حذف محصول
      // =========================
      removeItem: async (productId) => {
        const res = await cartService.removeItem(productId);

        set({
          items: res.data.items || [],
          totalPrice: res.data.totalPrice || 0,
        });
      },

      // =========================
      // خالی کردن Cart
      // =========================
      clearCart: async () => {
        await cartService.clearCart();

        set({
          items: [],
          totalPrice: 0,
        });
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
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
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
