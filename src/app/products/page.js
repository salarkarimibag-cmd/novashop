"use client";

import { useEffect, useState } from "react";

import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import ProductGridSkeleton from "@/components/ui/Skeleton/ProductGridSkeleton";

import { getProducts } from "@/services/productService";
import useDebounce from "@/hooks/useDebounce";
import useFilterStore from "@/store/filterStore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const selectedBrands = useFilterStore((state) => state.selectedBrands);

  const selectedCategories = useFilterStore(
    (state) => state.selectedCategories,
  );

  const sort = useFilterStore((state) => state.sort);

  const priceRange = useFilterStore((state) => state.priceRange);

  const searchQuery = useFilterStore((state) => state.searchQuery);

  // اسلایدر قیمت و کادر جستجو با هر حرکت تغییر می‌کنند؛
  // تا آرام نگیرند درخواستی فرستاده نمی‌شود
  const debouncedPriceRange = useDebounce(priceRange);

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    // با تغییر فیلترها درخواست قبلی لغو می‌شود
    // تا پاسخ کهنه روی پاسخ تازه ننشیند
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);

        setError(null);

        const result = await getProducts(
          {
            search: debouncedSearchQuery,

            brand: selectedBrands,

            category: selectedCategories,

            minPrice: debouncedPriceRange[0],

            maxPrice: debouncedPriceRange[1],

            sort,
          },
          { signal: controller.signal },
        );

        setProducts(result.products || []);

        setLoading(false);
      } catch (error) {
        // لغو عمدی خطا نیست؛ درخواست بعدی مسئول وضعیت است
        if (error.name === "AbortError") {
          return;
        }

        console.error(error);

        setError("خطا در دریافت محصولات");

        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [
    selectedBrands,
    selectedCategories,
    sort,
    debouncedPriceRange,
    debouncedSearchQuery,
  ]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        {searchQuery ? `نتایج جستجو برای "${searchQuery}"` : "همه محصولات"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilter />
        </aside>

        <section className="lg:col-span-3">
          <ProductSort />

          {loading && <ProductGridSkeleton />}

          {error && (
            <div
              className="
                rounded-xl
                bg-red-50
                p-5
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {!loading && !error && <ProductGrid products={products} />}
        </section>
      </div>
    </main>
  );
}
