import Image from "next/image";
import { Star } from "lucide-react";

export default function BestSellerCard({ product }) {
  return (
    <div
      className="
rounded-2xl
border
bg-white
p-4
transition
hover:shadow-lg
"
    >
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="
h-64
w-full
object-cover
transition
hover:scale-105
"
        />
      </div>

      <h3 className="mt-4 font-bold">{product.title}</h3>

      <div className="flex my-2">
        {Array.from({ length: product.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="font-bold">{product.price.toLocaleString()} تومان</p>
    </div>
  );
}
