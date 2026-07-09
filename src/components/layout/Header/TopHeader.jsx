export default function TopHeader() {
  return (
    <div className="hidden md:block border-b border-gray-200 bg-gray-50">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button className="transition hover:text-red-600">
            سوالات متداول
          </button>

          <button className="transition hover:text-red-600">
            پیگیری سفارش
          </button>

          <button className="transition hover:text-red-600">
            پشتیبانی
          </button>
        </div>

        <span className="text-sm text-gray-500">
          ارسال به سراسر ایران
        </span>
      </div>
    </div>
  );
}