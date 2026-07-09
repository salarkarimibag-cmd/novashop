import Container from "@/components/common/Container";

export default function TopHeader() {
  return (
    <div className="hidden md:block border-b border-gray-200 bg-gray-50">
      <Container className="flex h-12 items-center gap-8">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button className="transition hover:text-red-600">
            سوالات متداول
          </button>

          <button className="transition hover:text-red-600">
            پیگیری سفارش
          </button>

          <button className="transition hover:text-red-600">پشتیبانی</button>
        </div>

        <span className="text-sm text-gray-500">ارسال به سراسر ایران</span>
      </Container>
    </div>
  );
}
