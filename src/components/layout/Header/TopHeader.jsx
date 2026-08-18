"use client";

import Container from "@/components/common/Container";
import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";
import clearSession from "@/lib/session";
import { User, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
export default function TopHeader() {
  const hydrated = useHydration();

  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden md:block border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <Container className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <span className="cursor-default text-gray-400 dark:text-gray-500">سوالات متداول</span>

          <Link href="/account/orders" className="transition hover:text-red-600">
            پیگیری سفارش
          </Link>

          <span className="cursor-default text-gray-400 dark:text-gray-500">پشتیبانی</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="text-gray-500 dark:text-gray-400">ارسال به سراسر ایران</span>

          <ThemeToggle />

          {/* تا بازیابی localStorage، وضعیت ورود نامشخص است؛
              نمایش «ورود / ثبت نام» به کاربرِ واردشده پرش ایجاد می‌کند */}
          {!hydrated ? null : user ? (
            <div className="flex items-center gap-3">
              {/* فقط ادمین‌ها این لینک را می‌بینند؛ کاربر عادی که
                  دستی /admin/products را باز کند هم AdminRoute در
                  همان صفحه رد و ریدایرکتش می‌کند — این لینک فقط برای
                  دسترسی راحت‌تر ادمین است، نه تنها لایه‌ی حفاظتی */}
              {user.role === "admin" && (
                <Link
                  href="/admin/products"
                  className="
        flex items-center gap-2
        rounded-lg
        px-3 py-1.5
        text-sm
        text-gray-700
        transition
        hover:bg-red-50
        hover:text-red-600
        dark:text-gray-200
        dark:hover:bg-red-950/40
        dark:hover:text-red-500
      "
                >
                  <ShieldCheck size={18} />

                  <span>پنل مدیریت</span>
                </Link>
              )}

              <Link
                href="/account"
                className="
        group flex items-center gap-2
        rounded-lg
        px-3 py-1.5
        text-sm
        text-gray-700
        transition
        hover:bg-red-50
        hover:text-red-600
        dark:text-gray-200
        dark:hover:bg-red-950/40
        dark:hover:text-red-500
      "
              >
                <User size={18} className="transition group-hover:scale-110" />

                <span>سلام {user.name}</span>
              </Link>

              <button
                onClick={clearSession}
                className="
        flex items-center gap-2
        rounded-lg
        px-3 py-1.5
        text-sm
        text-gray-600
        transition
        hover:bg-gray-100
        hover:text-red-600
        dark:text-gray-300
        dark:hover:bg-gray-800
        dark:hover:text-red-500
      "
              >
                <LogOut size={17} />

                <span>خروج</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="
      flex items-center gap-2
      rounded-lg
      bg-red-600
      px-4 py-2
      text-sm
      text-white
      transition
      hover:bg-red-700
    "
            >
              <User size={17} />
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}
