import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import BestSellers from "@/components/products/BestSellers";
export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">همه محصولات</h1>
      <BestSellers />
      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilter />
        </aside>

        <section className="lg:col-span-3">
          <ProductSort />

          <ProductGrid />
        </section>
      </div>
    </main>
  );
}
