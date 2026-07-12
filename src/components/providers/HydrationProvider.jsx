"use client";

import { useEffect } from "react";

import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import useAddressStore from "@/store/addressStore";
import useWishlistStore from "@/store/wishlistStore";

export default function HydrationProvider({ children }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useCartStore.persist.rehydrate();
    useCheckoutStore.persist.rehydrate();
    useOrderStore.persist.rehydrate();
    useAddressStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  return children;
}
