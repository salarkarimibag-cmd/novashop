"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const applyThemeClass = (theme) => {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle("dark", theme === "dark");
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme) => {
        applyThemeClass(theme);

        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";

        get().setTheme(next);
      },
    }),

    {
      name: "nova-theme",
      skipHydration: true,
    },
  ),
);

export default useThemeStore;
