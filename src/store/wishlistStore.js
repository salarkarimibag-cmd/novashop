import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) return;

        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      toggleWishlist: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== product.id),
          }));
        } else {
          set((state) => ({
            items: [...state.items, product],
          }));
        }
      },

      clearWishlist: () =>
        set({
          items: [],
        }),

      isInWishlist: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "nova-wishlist",
      skipHydration: true,
    },
  ),
);

export default useWishlistStore;
