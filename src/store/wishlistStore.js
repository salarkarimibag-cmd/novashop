"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const getProductId = (product) => String(product._id || product.id);

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add wishlist
      addToWishlist: (product) => {
        const items = get().items;

        const productId = getProductId(product);

        const exists = items.some((item) => getProductId(item) === productId);

        if (!productId || exists) return;

        set({
          items: [...items, product],
        });
      },

      // Remove wishlist
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => getProductId(item) !== String(id),
          ),
        })),

      // Toggle wishlist
      toggleWishlist: (product) => {
        const items = get().items;

        const productId = getProductId(product);

        const exists = items.some((item) => getProductId(item) === productId);

        if (exists) {
          set({
            items: items.filter((item) => getProductId(item) !== productId),
          });
        } else {
          set({
            items: [...items, product],
          });
        }
      },

      // Check product
      isInWishlist: (id) =>
        get().items.some((item) => getProductId(item) === String(id)),

      // Clear
      clearWishlist: () =>
        set({
          items: [],
        }),
    }),

    {
      name: "nova-wishlist",
      skipHydration: true,
    },
  ),
);

export default useWishlistStore;
