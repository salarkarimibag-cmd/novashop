import bestSellers from "@/data/bestSellers";
import BestSellerCard from "./BestSellerCard";

export default function BestSellers() {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold">پرفروش‌ترین محصولات</h2>

      <div
        className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
lg:grid-cols-4
"
      >
        {bestSellers.map((product) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
