import { ShieldCheck, Truck, Headset, CreditCard } from "lucide-react";
import Container from "@/components/common/Container";

export const metadata = {
  title: "درباره ما",
};

const values = [
  {
    id: 1,
    title: "ضمانت اصالت",
    description: "تمام محصولات نوا‌شاپ اورجینال و دارای گارانتی هستند.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "ارسال سریع",
    description: "سفارش‌ها در سریع‌ترین زمان ممکن به دست شما می‌رسند.",
    icon: Truck,
  },
  {
    id: 3,
    title: "پرداخت امن",
    description: "پرداخت از طریق درگاه‌های معتبر و رمزنگاری‌شده.",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "پشتیبانی همیشگی",
    description: "تیم پشتیبانی نوا‌شاپ همیشه پاسخگوی سوالات شماست.",
    icon: Headset,
  },
];

export default function AboutPage() {
  return (
    <main className="py-14">
      <Container>
        <h1 className="text-3xl font-bold">درباره نوا‌شاپ</h1>

        <p className="mt-4 max-w-2xl leading-8 text-gray-600 dark:text-gray-400">
          نوا‌شاپ یک فروشگاه اینترنتی است که با هدف ارائه‌ی محصولات باکیفیت،
          قیمت مناسب و تجربه‌ی خریدی ساده و مطمئن راه‌اندازی شده است. تلاش ما
          این است که از انتخاب محصول تا رسیدن به دست شما، تجربه‌ای راحت و
          قابل‌اعتماد بسازیم.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex justify-center">
                <value.icon size={40} className="text-indigo-600 dark:text-indigo-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
