"use client";

import Container from "@/components/common/Container";
import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";
import clearSession from "@/lib/session";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
export default function TopHeader() {
  const hydrated = useHydration();

  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden md:block border-b border-gray-200 bg-gray-50">
      <Container className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button className="transition hover:text-red-600">
            سوالات متداول
          </button>

          <button className="transition hover:text-red-600">
            پیگیری سفارش
          </button>

          <button className="transition hover:text-red-600">پشتیبانی</button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="text-gray-500">ارسال به سراسر ایران</span>

          {/* تا بازیابی localStorage، وضعیت ورود نامشخص است؛
              نمایش «ورود / ثبت نام» به کاربرِ واردشده پرش ایجاد می‌کند */}
          {!hydrated ? null : user ? (
            <div className="flex items-center gap-3">
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
