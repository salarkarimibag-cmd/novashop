import { notFound } from "next/navigation";

import { getProductById } from "@/services/productService";

import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductDescription from "@/components/product-detail/ProductDescription";
import ProductSpecifications from "@/components/product-detail/ProductSpecifications";
import RelatedProducts from "@/components/product-detail/RelatedProducts";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // خطای واقعی عمداً گرفته نمی‌شود تا به error.js برسد
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <ProductInfo product={product} />
      </div>

      <div className="mt-12 space-y-8">
        <ProductDescription description={product.description ?? ""} />

        <ProductSpecifications specifications={product.specifications ?? {}} />
      </div>

      <RelatedProducts
        currentProductId={product._id}
        category={product.category ?? ""}
      />
    </main>
  );
}
