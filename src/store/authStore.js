"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// وضعیت کاربر خارج‌شده: نه کاربری هست، نه بررسی‌ای در جریان است
const loggedOutState = {
  user: null,
  token: null,
  loading: false,
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      token: null,

      // تا وقتی AuthProvider توکن را بررسی نکرده، وضعیت ورود نامشخص است
      loading: true,

      login: ({ user, token }) =>
        set({
          user,
          token,
          loading: false,
        }),

      logout: () => set({ ...loggedOutState }),

      clearAuth: () => set({ ...loggedOutState }),

      setUser: (user) => set({ user }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...data,
              }
            : null,
        })),

      setToken: (token) => set({ token }),

      setLoading: (loading) => set({ loading }),
    }),

    {
      name: "nova-auth",

      // مثل بقیه‌ی استورها، بازیابی را HydrationProvider انجام می‌دهد؛
      // این‌طور اولین رندر کلاینت با HTML سرور یکی است
      skipHydration: true,

      // فقط داده‌ی واقعی ذخیره می‌شود، نه وضعیت موقتِ UI
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

export default useAuthStore;
