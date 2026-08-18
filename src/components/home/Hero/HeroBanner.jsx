import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="hidden lg:flex flex-col gap-4">
      <div className="relative flex h-[184px] flex-col justify-center overflow-hidden rounded-2xl bg-gray-200 p-6">
        <span className="text-sm font-medium text-red-600">پیشنهاد ویژه</span>

        <h3 className="mt-2 text-xl font-bold text-gray-900">تا ۴۰٪ تخفیف</h3>

        <p className="mt-1 text-sm text-gray-600">روی محصولات منتخب فروشگاه</p>

        <Link
          href="/products"
          className="mt-4 w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          مشاهده محصولات
        </Link>
      </div>

      <div className="relative flex h-[184px] flex-col justify-center overflow-hidden rounded-2xl bg-gray-200 p-6">
        <span className="text-sm font-medium text-red-600">ارسال رایگان</span>

        <h3 className="mt-2 text-xl font-bold text-gray-900">
          برای خرید بالای ۵۰۰ هزار تومان
        </h3>

        <p className="mt-1 text-sm text-gray-600">به سراسر کشور</p>

        <Link
          href="/products"
          className="mt-4 w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          خرید کنید
        </Link>
      </div>
    </div>
  );
}
