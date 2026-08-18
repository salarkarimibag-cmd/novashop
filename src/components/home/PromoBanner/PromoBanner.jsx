import Link from "next/link";
import { ArrowLeft, Percent } from "lucide-react";

import Container from "@/components/common/Container";

export default function PromoBanner() {
  return (
    <section className="mt-6">
      <Container>
        <Link
          href="/products"
          className="
          group flex items-center justify-between gap-4
          overflow-hidden rounded-2xl
          bg-linear-to-l from-red-600 to-red-500
          px-6 py-5
          text-white
          shadow-sm
          transition
          hover:from-red-700 hover:to-red-600
          sm:px-8 sm:py-6
          dark:from-red-900 dark:to-red-800
          dark:shadow-none
          dark:hover:from-red-800 dark:hover:to-red-700
          "
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Percent size={22} />
            </span>

            <div>
              <p className="text-lg font-bold sm:text-xl">
                تا ۷۰٪ تخفیف روی محصولات منتخب
              </p>

              <p className="mt-1 text-sm text-white/80">
                فقط تا پایان این هفته، فرصت را از دست ندهید
              </p>
            </div>
          </div>

          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold transition group-hover:-translate-x-1">
            مشاهده پیشنهادها
            <ArrowLeft size={18} />
          </span>
        </Link>
      </Container>
    </section>
  );
}
