import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-col">
      <div className="relative flex min-h-36 flex-col justify-center overflow-hidden rounded-2xl bg-linear-to-br from-red-50 to-red-100 p-4 sm:min-h-44 sm:p-6 lg:min-h-46 dark:from-red-950/40 dark:to-red-900/20">
        <span className="text-sm font-medium text-red-600 dark:text-red-500">پیشنهاد ویژه</span>

        <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">تا ۴۰٪ تخفیف</h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">روی محصولات منتخب فروشگاه</p>

        <Link
          href="/products"
          className="mt-4 w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        >
          مشاهده محصولات
        </Link>
      </div>

      <div className="relative flex min-h-36 flex-col justify-center overflow-hidden rounded-2xl bg-linear-to-br from-red-50 to-red-100 p-4 sm:min-h-44 sm:p-6 lg:min-h-46 dark:from-red-950/40 dark:to-red-900/20">
        <span className="text-sm font-medium text-red-600 dark:text-red-500">ارسال رایگان</span>

        <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
          برای خرید بالای ۵۰۰ هزار تومان
        </h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">به سراسر کشور</p>

        <Link
          href="/products"
          className="mt-4 w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        >
          خرید کنید
        </Link>
      </div>
    </div>
  );
}
