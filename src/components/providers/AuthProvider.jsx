"use client";

import { useEffect } from "react";

import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import authService from "@/services/authService";
import clearSession from "@/lib/session";

export default function AuthProvider({ children }) {
  const hydrated = useHydration();

  const token = useAuthStore((state) => state.token);

  const setUser = useAuthStore((state) => state.setUser);

  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    if (!hydrated) return;

    async function checkAuth() {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const user = await authService.me();

        // پاسخی بدون کاربر یعنی توکن دیگر معتبر نیست
        if (!user) {
          clearSession();
          return;
        }

        setUser(user);

        // بج سبد خرید در هدر و وضعیت «در سبد هست» در کارت محصول هیچ‌وقت
        // خودشان fetchCart صدا نمی‌زنند؛ اینجا تنها جایی‌ست که برای هر
        // کاربر واردشده، صرف‌نظر از این‌که کدام صفحه را باز کرده، اجرا می‌شود
        useCartStore.getState().fetchCart();
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [hydrated, token, setUser, setLoading]);

  return children;
}
