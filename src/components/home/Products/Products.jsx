import { Suspense } from "react";

import Container from "@/components/common/Container";
import ProductGridSkeleton from "@/components/ui/Skeleton/ProductGridSkeleton";
import { getProducts } from "@/services/productService";
import ProductList from "./ProductList";

// چند محصول از فهرست کلی در صفحه‌ی اصلی نشان داده شود
const HOME_PRODUCTS_LIMIT = 8;

// دریافت محصولات روی سرور؛ همان الگوی SpecialOffers و Brands
async function ProductsContent() {
  let products = [];

  try {
    // بدون فیلتر: فیلترهای URL مخصوص صفحه‌ی /products است
    const result = await getProducts();

    products = result.products.slice(0, HOME_PRODUCTS_LIMIT);
  } catch (error) {
    // Next خطاهای کنترلی خود (رندر داینامیک، redirect، notFound) را با digest
    // پرتاب می‌کند؛ بلعیدن آن‌ها جریان داخلی Next را می‌شکند
    if (error?.digest) {
      throw error;
    }

    console.error(error);

    // خطای این بخش نباید کل صفحه‌ی اصلی را از کار بیندازد
    return (
      <p className="py-10 text-center text-gray-500 dark:text-gray-400">
        دریافت محصولات با خطا مواجه شد.
      </p>
    );
  }

  return <ProductList products={products} />;
}

export default function Products() {
  return (
    <Container className="py-12">
      <Suspense fallback={<ProductGridSkeleton count={HOME_PRODUCTS_LIMIT} />}>
        <ProductsContent />
      </Suspense>
    </Container>
  );
}
