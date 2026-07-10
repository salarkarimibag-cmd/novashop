import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function NewArrivalCard({ product }) {
  return (
    <div className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        {product.isNew && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-xs text-white">
            جدید
          </span>
        )}

        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">{product.title}</h3>

        <div className="my-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <Star
              key={item}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <p className="font-bold text-lg">
          {product.price.toLocaleString()} تومان
        </p>

        <div className="mt-4 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-2 text-white">
            <ShoppingCart size={18} />
            خرید
          </button>

          <button className="rounded-xl border p-2">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
