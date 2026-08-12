"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // در پروداکشن جای مناسبی برای ارسال به سرویس پایش خطاست
    console.error("خطای پیش‌بینی‌نشده:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          مشکلی پیش آمد
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          در نمایش این صفحه خطایی رخ داد. اگر سرور در دسترس نیست، کمی بعد دوباره
          تلاش کنید.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <Button onClick={reset} variant="danger" className="w-full">
            <RotateCw size={18} />
            تلاش دوباره
          </Button>

          <Link
            href="/"
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl border border-gray-300 bg-white px-5 py-3
              font-medium text-gray-800 transition
              hover:bg-gray-100
            "
          >
            <Home size={18} />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
