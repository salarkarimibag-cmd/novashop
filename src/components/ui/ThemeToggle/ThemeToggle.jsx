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
        flex h-9 w-9 items-center justify-center
        rounded-lg
        text-gray-600
        transition
        hover:bg-gray-100 hover:text-red-600
        disabled:cursor-not-allowed disabled:opacity-40
        dark:text-gray-300
        dark:hover:bg-gray-800 dark:hover:text-red-500
        ${className}
      `}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
