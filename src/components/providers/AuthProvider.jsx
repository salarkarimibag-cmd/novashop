"use client";

import { useEffect } from "react";
import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          clearSession();
          return;
        }

        const user = await res.json();
        setUser(user);
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
