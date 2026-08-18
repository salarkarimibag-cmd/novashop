"use client";

import { Moon, Sun } from "lucide-react";

import { useHydration } from "@/components/providers/HydrationProvider";
import useThemeStore from "@/store/themeStore";

export default function ThemeToggle({ className = "" }) {
  const hydrated = useHydration();

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // پیش از هیدریت شدن، مقدار واقعیِ تمِ ذخیره‌شده معلوم نیست؛
  // آیکن ثابت جلوی چشمک زدن را می‌گیرد
  const isDark = hydrated && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!hydrated}
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
      title={isDark ? "حالت روشن" : "حالت تاریک"}
      className={`
        relative flex h-9 w-9 shrink-0 items-center justify-center
        overflow-hidden rounded-full border border-gray-300
        text-gray-600
        transition
        hover:border-red-300 hover:bg-red-50 hover:text-red-600
        disabled:cursor-not-allowed disabled:opacity-40
        dark:border-gray-700 dark:text-gray-300
        dark:hover:border-red-900/50 dark:hover:bg-red-950/30 dark:hover:text-red-500
        ${className}
      `}
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      />

      <Moon
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
