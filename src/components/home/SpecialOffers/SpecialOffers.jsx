import OfferCard from "./OfferCard";
import { getDiscountProducts } from "@/services/productService";

export default async function SpecialOffers() {
  let products = [];

  try {
    products = await getDiscountProducts();
  } catch (error) {
    // خطاهای کنترلی خود Next (رندر داینامیک، redirect، notFound) با digest
    // مشخص می‌شوند؛ بلعیدن آن‌ها جریان داخلی Next را می‌شکند
    if (error?.digest) {
      throw error;
    }

    console.error(error);

    // خطای این بخش نباید کل صفحه‌ی اصلی را از کار بیندازد
    return null;
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold">🔥 پیشنهادهای ویژه</h2>

        <button className="text-indigo-600 hover:underline">مشاهده همه</button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <OfferCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
