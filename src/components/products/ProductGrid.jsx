import products from "@/data/products";
import ProductCard from "@/components/home/Products/ProductCard";

export default function ProductGrid() {
  return (
    <div
      className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
xl:grid-cols-3
"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
