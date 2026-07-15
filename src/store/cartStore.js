"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add product
      addItem: (product) => {
        const items = get().items;

        const existingItem = items.find(
          (item) =>
            item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedSize === product.selectedSize,
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id &&
              item.selectedColor === product.selectedColor &&
              item.selectedSize === product.selectedSize
                ? {
                    ...item,
                    quantity: item.quantity + (product.quantity || 1),
                  }
                : item,
            ),
          });

          return;
        }

        set({
          items: [
            ...items,
            {
              ...product,
              quantity: product.quantity || 1,
            },
          ],
        });
      },

      // Remove product
      removeItem: (id, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedColor === color &&
                item.selectedSize === size
              ),
          ),
        })),

      // Increase
      increaseQuantity: (id, color, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),

      // Decrease
      decreaseQuantity: (id, color, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item,
          ),
        })),

      // Update manually
      updateQuantity: (id, color, size, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? {
                  ...item,
                  quantity: Math.max(1, quantity),
                }
              : item,
          ),
        })),

      // Find item
      findItem: (id, color, size) =>
        get().items.find(
          (item) =>
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size,
        ),

      // Check item exists
      hasItem: (id, color, size) =>
        get().items.some(
          (item) =>
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size,
        ),

      // Clear cart
      clearCart: () =>
        set({
          items: [],
        }),

      // Total quantity
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      // Total price
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),

    {
      name: "nova-cart",
      skipHydration: true,
    },
  ),
);

export default useCartStore;
