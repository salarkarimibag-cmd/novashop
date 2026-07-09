import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export default function OfferCard({ offer }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
          %{offer.discount}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="font-semibold">{offer.title}</h3>

        <div>
          <p className="text-sm text-gray-400 line-through">
            {offer.oldPrice.toLocaleString()} تومان
          </p>

          <p className="text-xl font-bold text-indigo-600">
            {offer.price.toLocaleString()} تومان
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700">
          <FaShoppingCart />
          خرید
        </button>
      </div>
    </div>
  );
}
