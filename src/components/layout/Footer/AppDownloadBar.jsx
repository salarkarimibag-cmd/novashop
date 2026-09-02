import Link from "next/link";
import Image from "next/image";
import { Smartphone } from "lucide-react";

// اپلیکیشن موبایل نوا‌شاپ هنوز منتشر نشده، برای همین لینک‌ها موقتاً به «#»
// اشاره می‌کنند تا وقتی نسخه‌ی واقعی روی هرکدام از این فروشگاه‌ها منتشر شود.
// نشان‌های بازار و مایکت، فایل رسمیِ خودِ آن دو شرکت‌اند (از صفحه‌ی
// راهنمای نشان‌های هرکدام گرفته شده‌اند). سیب‌اپ نشان دانلود رسمی‌ای
// منتشر نکرده، برای همین فقط از آیکون رسمی برنامه‌اش استفاده شده.
const stores = [
  {
    name: "بازار",
    href: "#",
    badge: (
      <Image
        src="/app-badges/bazaar.png"
        alt="دریافت از بازار"
        width={140}
        height={42}
        className="h-10 w-auto"
      />
    ),
  },
  {
    name: "مایکت",
    href: "#",
    badge: (
      <Image
        src="/app-badges/myket.svg"
        alt="دریافت از مایکت"
        width={140}
        height={42}
        className="h-10 w-auto rounded-md"
      />
    ),
  },
  {
    name: "سیب‌اپ",
    href: "#",
    badge: (
      <span className="flex h-10 items-center gap-2 rounded-lg bg-white px-2.5">
        <Image
          src="/app-badges/sibapp-icon.png"
          alt="سیب‌اپ"
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 rounded-md"
        />
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] text-gray-500">نسخه iOS</span>
          <span className="text-xs font-bold text-gray-900">سیب‌اپ</span>
        </span>
      </span>
    ),
  },
];

export default function AppDownloadBar() {
  return (
    <div className="border-b border-slate-700 bg-slate-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600">
            <Smartphone size={18} className="text-white" />
          </span>
          <span className="text-sm font-bold text-white sm:text-base">
            دانلود اپلیکیشن نوا‌شاپ
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {stores.map((store) => (
            <Link
              key={store.name}
              href={store.href}
              aria-label={`دریافت از ${store.name}`}
              className="opacity-90 transition-all duration-300 ease-out hover:scale-110 hover:opacity-100"
            >
              {store.badge}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
