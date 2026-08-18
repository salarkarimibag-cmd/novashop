"use client";

import { createContext, useContext, useEffect, useState } from "react";

import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import useAddressStore from "@/store/addressStore";
import useWishlistStore from "@/store/wishlistStore";
import useThemeStore from "@/store/themeStore";

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
          useThemeStore.persist.rehydrate(),
        ]);
      } finally {
        setHydrated(true);
      }
    }

    hydrate();
  }, []);

  // صفحه بلافاصله رندر می‌شود؛ فقط بخش‌هایی که به داده‌ی ذخیره‌شده
  // وابسته‌اند با useHydration() منتظر می‌مانند
  return (
    <HydrationContext.Provider value={hydrated}>
      {children}
    </HydrationContext.Provider>
  );
}
