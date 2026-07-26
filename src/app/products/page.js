"use client";

import { useEffect, useState } from "react";

import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";

import { getProducts } from "@/services/productService";
import useFilterStore from "@/store/filterStore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedCategories = useFilterStore(
    (state) => state.selectedCategories,
  );
  const sort = useFilterStore((state) => state.sort);
  const priceRange = useFilterStore((state) => state.priceRange);
  const searchQuery = useFilterStore((state) => state.searchQuery);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      try {
        const { products } = await getProducts({
          search: searchQuery,
          brand: selectedBrands,
          category: selectedCategories,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort,
        });

        setProducts(products);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedBrands, selectedCategories, sort, priceRange, searchQuery]);

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

          {loading ? (
            <div className="rounded-2xl border bg-white p-10 text-center">
              در حال دریافت محصولات...
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </div>
    </main>
  );
}
