"use client";

import { useEffect } from "react";
import { useHydration } from "@/components/providers/HydrationProvider";

import useAuthStore from "@/store/authStore";

export default function AuthProvider({ children }) {
  const hydrated = useHydration();

  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!hydrated || !token) return;

    async function checkAuth() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        logout();
        return;
      }

      const user = await res.json();

      setUser(user);
    }

    checkAuth();
  }, [hydrated, token, setUser, logout]);

  return children;
}
