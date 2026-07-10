import products from "@/data/products";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

export default async function ProductPage({ params }) {
  const product = products.find((item) => item.id === Number(params.id));

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-center text-2xl font-bold">محصول پیدا نشد</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Gallery + Info */}
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>

      {/* Tabs */}
      <ProductTabs product={product} />

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </main>
  );
}
