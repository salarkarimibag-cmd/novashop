import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";

import { getProducts } from "@/services/productService";
import { getBrands } from "@/services/brandService";
import { getCategories } from "@/services/categoryService";
import { parseProductFilters } from "@/lib/productFilters";

export const metadata = {
  title: "محصولات",
};

export default async function ProductsPage({ searchParams }) {
  const filters = parseProductFilters(new URLSearchParams(await searchParams));

  // لیست برندها و دسته‌ها فرعی است؛ خطایشان نباید کل صفحه را از کار بیندازد.
  // خطای دریافت محصولات عمداً گرفته نمی‌شود تا به error.js برسد.
  const [{ products }, brands, categories] = await Promise.all([
    getProducts(filters),
    getBrands().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        {filters.search
          ? `نتایج جستجو برای "${filters.search}"`
          : "همه محصولات"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilter brands={brands} categories={categories} />
        </aside>

        <section className="lg:col-span-3">
          <ProductSort />

          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
}
