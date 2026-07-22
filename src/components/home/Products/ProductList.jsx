import products from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id ?? product.id} product={product} />
      ))}
    </section>
  );
}
