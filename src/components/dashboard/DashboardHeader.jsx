"use client";

import Link from "next/link";
import { CalendarDays, ShoppingBag } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function DashboardHeader() {
  const user = useAuthStore((state) => state.user);

  const today = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="mb-2 text-sm text-slate-300">پنل کاربری NovaShop</p>

          <h1 className="text-3xl font-extrabold">
            سلام {user?.name || "کاربر"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            خوش آمدید. از این بخش می‌توانید سفارش‌ها، آدرس‌ها، علاقه‌مندی‌ها و
            اطلاعات حساب خود را مدیریت کنید.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2">
            <CalendarDays size={18} />
            <span>{today}</span>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-105"
          >
            <ShoppingBag size={18} />
            ادامه خرید
          </Link>
        </div>
      </div>
    </section>
  );
}
