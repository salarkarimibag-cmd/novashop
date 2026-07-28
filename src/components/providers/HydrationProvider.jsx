"use client";

import { createContext, useContext, useEffect, useState } from "react";

import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import useAddressStore from "@/store/addressStore";
import useWishlistStore from "@/store/wishlistStore";

const HydrationContext = createContext(false);

export function useHydration() {
  return useContext(HydrationContext);
}

export default function HydrationProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      try {
        await Promise.all([
          useAuthStore.persist.rehydrate(),
          useCartStore.persist.rehydrate(),
          useCheckoutStore.persist.rehydrate(),
          useOrderStore.persist.rehydrate(),
          useAddressStore.persist.rehydrate(),
          useWishlistStore.persist.rehydrate(),
        ]);
      } finally {
        setHydrated(true);
      }
    }

    hydrate();
  }, []);

  return (
    <HydrationContext.Provider value={hydrated}>
      {hydrated ? children : null}
    </HydrationContext.Provider>
  );
}
