import Link from "next/link";

export default function FooterLinks() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div>
        <h3 className="mb-4 text-xl font-bold">NovaShop</h3>

        <p className="text-gray-400">
          فروشگاه اینترنتی مدرن با بهترین قیمت و سریع‌ترین ارسال.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-bold">لینک‌های سریع</h3>

        <ul className="space-y-3 text-gray-400">
          <li>
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
          </li>
          <li>
            <Link href="/products" className="transition hover:text-white">
              محصولات
            </Link>
          </li>
          <li className="cursor-default text-gray-500">درباره ما</li>
          <li className="cursor-default text-gray-500">تماس با ما</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-bold">تماس با ما</h3>

        <ul className="space-y-3 text-gray-400">
          <li>
            <a href="tel:09188337446" className="transition hover:text-white">
              09188337446
            </a>
          </li>
          <li>
            <a
              href="mailto:info@novashop.ir"
              className="transition hover:text-white"
            >
              info@novashop.ir
            </a>
          </li>
          <li>
            <a
              href="https://maps.google.com/?q=کرمانشاه، ایران"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              کرمانشاه, ایران
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
