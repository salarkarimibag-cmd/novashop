"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";

const STORAGE_KEY = "nova-signup-prompt-seen";

/**
 * یک بار برای هر کاربر مهمان، پیشنهاد ثبت‌نام را به صورت toast نمایش می‌دهد.
 * با یک فلگ در localStorage، دیگر هرگز برای همان مرورگر تکرار نمی‌شود.
 */
export default function SignupPrompt() {
  const hydrated = useHydration();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const shown = useRef(false);

  useEffect(() => {
    if (!hydrated || user || shown.current) return;

    if (localStorage.getItem(STORAGE_KEY)) return;

    shown.current = true;
    localStorage.setItem(STORAGE_KEY, "1");

    toast("به NovaShop خوش آمدید!", {
      description: "برای پیگیری سفارش‌ها و تجربه‌ای بهتر، همین حالا ثبت‌نام کنید.",
      action: {
        label: "ثبت‌نام",
        onClick: () => router.push("/register"),
      },
      duration: 8000,
    });
  }, [hydrated, user, router]);

  return null;
}
