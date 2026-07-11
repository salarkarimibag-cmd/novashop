"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <CheckCircle size={70} className="mx-auto mb-5 text-green-500" />

        <h1 className="mb-4 text-2xl font-bold">
          سفارش شما با موفقیت ثبت شد 🎉
        </h1>

        <p className="mb-6 text-gray-500">
          سفارش شما دریافت شد و پس از آماده‌سازی ارسال خواهد شد.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-black py-3 text-white transition hover:bg-gray-800"
          >
            ادامه خرید
          </Link>

          <Link
            href="/"
            className="rounded-xl border py-3 transition hover:bg-gray-50"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  );
}
