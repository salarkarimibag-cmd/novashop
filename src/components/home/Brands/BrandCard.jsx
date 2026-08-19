import Image from "next/image";

import { getBrandLogo } from "@/constants/brands";

export default function BrandCard({ brand }) {
  const logo = getBrandLogo(brand);

  return (
    <div
      className="
      flex
      h-28
      items-center
      justify-center
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      dark:border-gray-700
      dark:bg-gray-900
    "
    >
      {logo ? (
        <Image
          src={logo}
          alt={brand}
          width={48}
          height={48}
          // این لوگوها SVG هستند و بهینه‌ساز next/image بدون
          // dangerouslyAllowSVG آن‌ها را رد می‌کند. unoptimized فایل را
          // مستقیم سرو می‌کند، بدون باز کردن آن تنظیم برای تصاویر ریموت.
          unoptimized
          className="h-10 w-auto object-contain opacity-70 transition hover:opacity-100"
        />
      ) : (
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{brand}</span>
      )}
    </div>
  );
}
