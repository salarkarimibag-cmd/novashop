import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Compass className="h-8 w-8 text-red-600" />
        </div>

        <p className="mt-6 text-5xl font-black text-gray-200">۴۰۴</p>

        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          این صفحه پیدا نشد
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          آدرسی که وارد کرده‌اید وجود ندارد یا محصول موردنظر حذف شده است.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
          <Link
            href="/products"
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl bg-red-500 px-5 py-3
              font-medium text-white transition
              hover:bg-red-600
            "
          >
            <Search size={18} />
            دیدن محصولات
          </Link>

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
