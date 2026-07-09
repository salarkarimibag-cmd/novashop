import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-xl border p-4 transition hover:shadow-lg">
      <Image
        src={product.image}
        width={300}
        height={300}
        alt={product.title}
        className="rounded-lg object-cover"
      />

      <h3 className="mt-4 font-bold">{product.title}</h3>

      <p className="mt-2 text-gray-600">
        {product.price.toLocaleString()} تومان
      </p>

      <button className="mt-4 w-full rounded-lg bg-black py-2 text-white">
        افزودن به سبد
      </button>
    </div>
  );
}
