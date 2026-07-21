import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import { getProducts } from "@/services/productService";

export default async function ProductsPage({ searchParams }) {
  const search = (await searchParams)?.search || "";

  const { products } = await getProducts();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        {search ? `نتایج جستجو برای "${search}"` : "همه محصولات"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilter />
        </aside>

        <section className="lg:col-span-3">
          <ProductSort />

          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
}